mod env;
mod heartbeat;
mod init;
mod service;
mod types;

use ic_cdk_macros::*;
use crate::service::MusallService;
use crate::types::*;
use std::collections::btree_map::BTreeMap;
use std::{cell::RefCell, vec};
use ic_cdk::api::caller as caller_api;

use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};

type PrincipalName = String;

#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

thread_local! {
    pub static NEXT_CONTRACT_ID: RefCell<u64> = RefCell::new(1);
    pub static CONTRACTS: RefCell<BTreeMap<PrincipalName, Contract>> = RefCell::new(BTreeMap::new());
    pub static SERVICE: RefCell<MusallService> = RefCell::new(MusallService::default());
    // pub static SERVICE: RefCell<MusallService> = RefCell::default();
}

fn caller() -> Principal {
    let caller: Principal = caller_api();
    // if caller == Principal::anonymous() {
    //     panic!("Anonymous principal not allowed to make calls.")
    // }
    caller
}

// #[init]
// fn init() {
//     ic_cdk::setup();

//     let mut init_service = MusallService::default();
//     init_service.env = Box::new(CanisterEnvironment {});

//     SERVICE.with(|service| *service.borrow_mut() = init_service);
// }

#[ic_cdk_macros::query]
fn get_number_of_contracts() -> usize {
    CONTRACTS.with(|service| service.borrow().keys().len())
}

// #[ic_cdk_macros::query]
// fn get_all_contracts() {
//     CONTRACTS.with(|cons|{
//         let values = cons.get_mut();})
// }

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn get_contract(id: String) -> Option<Contract> {
//     SERVICE.with(|service| service.borrow().get_key_value())
// }

// #[ic_cdk_macros::query]
// fn get_contract_given_principal(principal: Principal) -> Option<Contract> {
//     let user = principal.to_string();
//     let contract = CONTRACTS.with(|cons| {
//         cons
//         .borrow()
//         .get_key_value(&user)});
//         *contract

// }

// #[update]
// #[candid_method(update)]
// pub async fn deposit(token_canister_id: Principal) -> DepositReceipt {
//     let caller = caller();
//     let ledger_canister_id = STATE
//         .with(|s| s.borrow().ledger)
//         .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

//     let amount = if token_canister_id == ledger_canister_id {
//         deposit_icp(caller).await?
//     } else {
//         deposit_token(caller, token_canister_id).await?
//     };
//     STATE.with(|s| {
//         s.borrow_mut()
//             .exchange
//             .balances
//             .add_balance(&caller, &token_canister_id, amount.to_owned())
//     });
//     DepositReceipt::Ok(amount)
// }

#[update(name = "add_account")]
fn add_account(tokens: Tokens) {
    let user = caller();
    let account_exists = SERVICE.with(|acc| acc.borrow().accounts.contains_key(&user));
    if account_exists {
        SERVICE.with(|a| {
            a.borrow_mut().accounts.insert(user, tokens);
        });
    }
}

// #[update(name = "delete_account")]
// fn delete_account(principal: Principal) {
//     let user = caller();
//     if user != principal {
//         return;
//     }
//     SERVICE.with(|acc| {
//         acc.borrow_mut()
//             .accounts
//             .remove_entry(&user)
//             .expect(&format!(
//                 "deleted user account with principal id: {} ",
//                 principal
//             ))
//     });
// }

/*
#[update(name = "update_contract_state")]
fn update_contract_state(contract_id: u64, new_state: ContractState){
    let _old_contract = SERVICE.with(|service|{
        service
        .borrow_mut()
        .contracts
        .get_key_value(&contract_id)
       
    });

    // let present = SERVICE.with(|c|{ c.borrow_mut()
    //         .contracts.contains_key(&contract_id)});
}
*/

#[update(name = "add_contract")]
fn add_contract(contract_name: String, contract_notes: String) -> LResult<String, String> {
    let user: Principal = caller();
    let user_str: String = user.to_string();
    let contract_id = NEXT_CONTRACT_ID.with(|counter| {
        let mut writer = counter.borrow_mut();
        *writer += 1;
        *writer
    });
    if user != Principal::anonymous() {
        return LResult::Err("User is anonymous and needs to validate".to_string());
    }

    CONTRACTS.with(|cons| {
        let _contrs = cons.borrow_mut().insert(
            user_str,
            Contract {
                id: (contract_id),
                timestamp: (ic_cdk::api::time()),
                creator: (caller()),
                status: ContractState::Open,
                voters: (vec![caller()]),
                contract_name: contract_name.clone(),
                contract_text: contract_notes.clone(),
            },
        );
    });

    SERVICE.with(|serv| {
        let _contracts = serv.borrow_mut().contracts.insert(
            contract_id,
            Contract {
                id: (contract_id),
                timestamp: (ic_cdk::api::time()),
                creator: (user),
                voters: vec![(caller())],
                status: (ContractState::Open),
                contract_name: (contract_name.clone()),
                contract_text: (contract_notes.clone()),
            },
        );
    });
    LResult::Ok("Contract created and added to Musall and Contract Storage".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_contracts_not_zero() {
        add_contract("contract_name".to_string(), "contract_notes".to_string());
        assert_eq!(get_number_of_contracts(), 1)
    }

    #[test]
    #[ignore]
    fn test_contracts_add() {
        assert_eq!(
            add_contract(String::from("lleeee"), String::from("thhthte")),
            LResult::Ok("Contract created and added to Musall".to_string())
        )
    }

    #[test]
    #[ignore]
    #[should_panic(expected = "assertion failed: users()")]
    fn test_add_contract_panics() {
        // CONTRACTS.with(|cons| {
        //     cons.borrow_mut()
        //         .insert(
        //             Principal::anonymous().to_string(),
        //             Contract {
        //                 id: (1u64),
        //                 timestamp: (ic_cdk::api::time()),
        //                 creator: (Principal),
        //                 voters: (),
        //                 status: (),
        //                 contract_name: (),
        //                 contract_text: () })
        // });
    }
}

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn get_system_params() -> SystemParams {
//     SERVICE.with(|service| service.borrow().system_params.clone())
// }

// #[update]
// #[ic_cdk::export::candid::candid_method]
// fn transfer(args: TransferArgs) -> Result<(), String> {
//     SERVICE.with(|service| service.borrow_mut().transfer(args))
// }

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn account_balance() -> Tokens {
//     SERVICE.with(|service| service.borrow().account_balance())
// }

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn list_accounts() -> Vec<Account> {
//     SERVICE.with(|service| service.borrow().list_accounts())
// }

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn get_contracts(contract_id: u64) -> Option<Contract> {
//     SERVICE.with(|service| service
//         .borrow()
//         .get_contracts(contract_id))
// }

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn list_contracts() -> Vec<Contract> {
//     SERVICE.with(|service| service
//         .borrow()
//         .list_contracts())
// }

// #[query]
// #[ic_cdk::export::candid::candid_method(query)]
// fn get_open_contracts() -> Vec<Contract> {
//     SERVICE.with(|service| {
//         service.borrow_mut()
//             .contracts
//             .values_mut()
//             .filter(|contract| contract.state == ContractState::Succeeded)
//             .map(|contract| { contract.state = ContractState::Open; contract.clone() } )
//             .collect()
//     })
// }

// mod types;
