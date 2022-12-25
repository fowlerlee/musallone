use crate::env::{EmptyEnvironment, Environment};
use crate::types::*;
use ic_cdk::export::Principal;
use std::collections::HashMap;
use crate::NEXT_CONTRACT_ID;

// /// Implements the Musall DAO interface
pub struct MusallService {
    pub env: Box<dyn Environment>,
    pub accounts: HashMap<Principal, Tokens>,
    pub contracts: HashMap<u64, Contract>,
    pub next_contract_id: u64,
    pub system_params: SystemParams,
}

impl Default for MusallService {
    fn default() -> Self {
        MusallService {
            env: Box::new(EmptyEnvironment {}),
            accounts: HashMap::new(),
            contracts: HashMap::new(),
            next_contract_id: 0,
            system_params: Default::default(),
        }
    }
}

impl From<MusallStableStorage> for MusallService {
    fn from(stable: MusallStableStorage) -> MusallService {
        let accounts = stable
            .accounts
            .clone()
            .into_iter()
            .map(|a| (a.owner, a.tokens))
            .collect();
        let contracts = stable
            .contracts
            .clone()
            .into_iter()
            .map(|p| (p.id, p))
            .collect();

        MusallService {
            env: Box::new(EmptyEnvironment {}),
            accounts,
            contracts,
            next_contract_id: 0,
            system_params: stable.system_params,
        }
    }
}

impl MusallService {

    pub fn transfer(&mut self, transfer: TransferArgs) -> LResult<String, String> {
        let caller = self.env.caller();

        if let Some(account) = self.accounts.get_mut(&caller) {
            if account.clone() < transfer.amount {
                return LResult::Err(format!(
                    "Caller's account has insufficient funds to transfer {:?}",
                    transfer.amount
                ));
            } else {
                *account -= transfer.amount + self.system_params.transfer_fee;
                let to_account = self.accounts.entry(transfer.to).or_default();
                *to_account += transfer.amount;
            }
        } else {
            return LResult::Err("Caller needs an account to transfer funds".to_string());
        }
        LResult::Ok(format!("Transfer for user {:?} has succeeded", caller))
    }    

    pub fn account_balance(&self) -> Tokens {
        let caller = self.env.caller();
        self.accounts
            .get(&caller)
            .cloned()
            .unwrap_or_else(|| Default::default())
    }

    pub fn list_accounts(&self) -> Vec<Account> {
        self.accounts
            .clone()
            .into_iter()
            .map(|(owner, tokens)| Account { owner, tokens })
            .collect()
    }

        /// Return the proposal with the given ID, if one exists
    pub fn get_contracts(&self, contract_id: u64) -> Option<Contract> {
        self.contracts.get(&contract_id).cloned()
    }
    
        /// Return the list of all proposals
    pub fn list_contracts(&self) -> Vec<Contract> {
        self.contracts.values().cloned().collect()
    } 

    pub fn add_account(&self, id: Principal, tokens: Tokens) {
        self.accounts
        .clone()
        .insert(id, tokens);
    }

    pub fn add_contracts(&mut self, contract_text: String, contract_name: String) -> LResult<String, String>{
        let contract_id = NEXT_CONTRACT_ID.with(|counter| {
            let mut writer = counter.borrow_mut();
            *writer += 1;
            *writer
        });

        let contract = Contract {
            id: contract_id,
            timestamp: ic_cdk::api::time(),
            creator: ic_cdk::caller(),
            voters: vec![ic_cdk::caller()],
            status: ContractState::Open,
            contract_name: contract_name,
            contract_text: contract_text,

        };
        if let Some(_x) = self.contracts.get(&contract_id) {
            LResult::Err("a contract already exisits with this id".to_string())
        } else {
            self.contracts.insert(contract_id, contract);
                LResult::Ok("Contract added to Musall".to_string())
        }     
    }

    pub fn update_contract_state(&mut self, contract_id: u64, new_state: ContractState){
        if let Some(contract) = self.contracts.get_mut(&contract_id){
            contract.status = new_state
        }
    }

    #[allow(dead_code)]
    fn deduct_contract_submission_fee(&mut self) -> LResult<String, String>{
      let caller = self.env.caller();
        if let Some(tokens) = self.accounts.get_mut(&caller){
            if tokens.clone() < self.system_params.contract_submission_deposit {
                return LResult::Err(format!("Caller's account must have at least {:?} to create contract",
                        self.system_params.contract_submission_deposit));
            } else {
                *tokens -= self.system_params.contract_submission_deposit.clone();
            }
        } else {
            return LResult::Err("Caller needs a valid account to create a contract".to_string());
        }
      LResult::Ok("passed".to_string())
    }
}


#[cfg(test)]
mod tests {
    use crate::{caller, SERVICE};

    use super::*;

    #[test]
    #[ignore]
    fn test_contracts_not_zero() {
        // let mut contract;
        // SERVICE.with(|s| {
        //     contract = s.borrow_mut().get_contracts(1u64);
        // });
        // if contract.is_some(){
        //     print!("contracts present in the MusallDao, and not empty")
        // } else {
        //     print!("Musall Dao empty, needs contracts to be created")
        // }
        
    }
}