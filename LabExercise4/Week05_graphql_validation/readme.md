query{
  welcome,
	greet(name: "Ramtin")
  
  user {
    uid
    fnm
    lnm
    salary
  }
  
  u2: user{
		...UserFields
  }
  
  u3: user{
    ...UserFields
  }
}

fragment UserFields on User{
  fnm
  lnm
}


// POSTMAN
mutation{
    u1: addUser(uid: 1, fnm: "Ramtin", lnm:" Abolfazli", salary: 500.00){
        uid 
        fnm
        lnm
        salary
    }
    u2: addUser(uid: 1, fnm: "Ramtin", lnm:" Abolfazli", salary: 500.00){
        uid 
        fnm
        lnm
        salary
    }
}
