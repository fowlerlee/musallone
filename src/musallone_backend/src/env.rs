use ic_cdk::export::Principal;

pub trait Environment{
    fn now(&self) -> u64;
    fn caller(&self) -> Principal;
    fn canister_id(&self) -> Principal;
}

pub struct CanisterEnvironment{}

impl Environment for CanisterEnvironment{
    fn now(&self) -> u64{
        ic_cdk::api::time()
    }

    fn caller(&self) -> Principal{
        ic_cdk::caller()
    }

    fn canister_id(&self) -> Principal{
        ic_cdk::id()
    }
}

pub struct EmptyEnvironment{}

impl Environment for EmptyEnvironment{
    fn now(&self) -> u64{
        unimplemented!()
    }

    fn caller(&self) -> Principal{
        unimplemented!()
    }

    fn canister_id(&self) -> Principal{
        unimplemented!()
    }
}