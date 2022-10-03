

// require inquirer for prompting 
const inquirer = require('inquirer');
// route database connections
const db = require('../config/connection');
// require query handling function
const {show} = require('./queries');

class Database{
  
    constructor(){
        this.department=[];
        this.employee =[];
        this.role = [];
    }
  
  
  
  
    init()
    {
      //departments array to pull data from
      db.query(`SELECT * FROM department`,(err,res)=> {
        let zerb = [];
        //error log
        if(err){
            console.log(err);
        }
        //takes the response and converts it into a readable array
        if(res){ 
            res.map(x =>{
                const {name} = x;
                zerb.push(name);
            });
        };
        this.department = zerb;
    });
  
    //role array to pull data from
    db.query(`SELECT * FROM role`,(err,res)=> {
      let zerb = [];
      //error log
      if(err){
          console.log(err);
      }
      //takes the response and converts it into a readable array
      if(res){ 
          res.map(x =>{
              const {title} = x;
              zerb.push(title);
          });
      }
      this.role = zerb;
  });
  
  db.query(`SELECT * FROM employee`,(err,res)=> {
    let zerb = [];
    //error log
    if(err){
        console.log(err);
    }
    //takes the response and converts it into a readable array
    if(res){ 
        res.map(x =>{
            const {first_name, last_name} = x;
            zerb.push(first_name + " " + last_name);
          });
         };
        this.employee = zerb;
        });
        
        
  
        
        //do inquirer prompts
        inquirer.prompt([
        {
          type: 'list',
              message: "What would you like to do?",
              name: 'choice',
              choices: [
                  
                'View All Employees',
                'Add Employee',
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                'View All Departments',
                "Add Department",
                "Goodbye"
            ]
        }
        
      ])
      .then(( {choice} ) =>{
        switch (choice) {
          case 'View All Employees':
            console.clear();
            this.viewEmployee();
            break;
          
          case 'Add Employee':
            console.clear();
            this.addEmployee();
            break;  
          case 'Update Employee Role':
            console.clear();
            this.updateEmployee();
            break;
  
          case 'View All Roles':
            console.clear();
            this.viewRole();
            break;
          case 'Add Role':
            console.clear();
            this.addRole();
            break;       
          case 'View All Departments':
            console.clear();
              this.viewDepartments();
              break;
          case 'Add Department':
            console.clear();
            this.addDepartment();
            break;
            
          case 'Goodbye':
              break;
      }
      }
  
      )
    }
  
addDepartment()
{
    inquirer.prompt({
        type:'input',
        message:'What is the name of the department you would like to add?',
        name: 'brobe'
    })
    .then(({brobe}) =>{

        const sqwi = `INSERT INTO department (name) VALUES (?)`
        db.query(sqwi,brobe, (err, result)=>{
            if(err){
                console.log(err)
                   }
                console.log(`\n\n${brobe} has been successfully added! \n \n`);
                 // returns the starting prompt again
                return this.init();
            });
    })
}

addRole()
{
    inquirer.prompt([
        {
            type:'input',
            message:'What is the name of the role you would like to add?',
            name: 'grobo'
        },
        {
            type:'list',
                name: 'department_id',
                message: 'What department is it part of?',
                choices: this.department
        },
        {
            type:'input',
            message:'What is salary of this role?',
            name: 'salashi'
        }
        

        
    ])
    .then((response) =>{

        let {grobo, department_id, salashi} = response;

        db.query(`SELECT id FROM department WHERE name ='${department_id}'`,(err, result) =>{
            if(err){
               console.log(err)
                   }
                // query formatting to intert role 
               const sqwi = `INSERT INTO role ( title, department_id, salary) VALUES (?,?,?)`
               // deconstructs id variable from result
               console.log(result);
               let {id} = result[0];
               // params variable for new query
               let beef = [grobo,id,salashi];
               // Insert query
               db.query(sqwi,beef, (err, result)=>{
                if(err){
                    console.log(err)
                       }
                     // returns the starting prompt again
                    return this.init();
                });
           })
          
        
        
    })
}

addEmployee()
{
    inquirer.prompt([
        {
            type:'input',
            message:'What is the first name?',
            name: 'first'
        },
        {
            type:'input',
            message:'What is the last name?',
            name: 'last'
        },
        {
            type:'list',
                name: 'role_cool',
                message: 'What role are they part of?',
                choices: this.role
        },
        {
            type:'list',
                name: 'manager',
                message: 'Managers name?',
                choices: this.employee
        },
        

        
    ])
    .then((response) =>{

        let {first, last, role_cool, manager} = response;

        db.query(`SELECT id FROM role WHERE title ='${role_cool}'`,(err, result) =>{
            if(err){
               console.log(err)
                   }
                // query formatting to intert role 
               const sqwi = `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?,?,?,?)`
               // deconstructs id variable from result
               console.log(result);
               let {id} = result[0];
               // params variable for new query
               if(manager =='NULL')
               {
                manager = NULL;
               }
               let beef = [first, last, id, manager];
               // Insert query
               db.query(sqwi,beef, (err, result)=>{
                if(err){
                    console.log(err)
                       }
                     // returns the starting prompt again
                    return this.init();
                });
           })
          
        
        
    })
}

updateEmployee()
{
    inquirer.prompt([

        {
            type:'list',
                name: 'employ',
                message: 'What employee are we changing?',
                choices: this.employee
        },
        {
            type:'list',
                name: 'role_cool',
                message: 'What role are they receiving?',
                choices: this.role
        }
    ])
        .then((response) =>{
            let {employ, role_cool} = response;

            let bigName = employ.split(' ');
            // grab only the last name
            const last_name = bigName[1];
            
            db.query(`SELECT id FROM role WHERE title ='${role_cool}'`,(err, result) =>{
                if(err){
                   console.log(err)
                       }
                    // query formatting to intert role 
                   const sqwi = `UPDATE employee SET role_id = ? WHERE last_name = ?`
                   // deconstructs id variable from result
                   console.log(result);
                   let {id} = result[0];
                   // params variable for new query
                   let beef = [id, last_name];
                   // Insert query
                   db.query(sqwi,beef, (err, result)=>{
                    if(err){
                        console.log(err)
                           }
                         // returns the starting prompt again
                        return this.init();
                    });
               })

    })
}




viewDepartments()
    {
      show('department');
  
      this.init();
     }

viewRole()
{
    show('role');

    this.init();
}
viewEmployee()
{
    show('employee');

    this.init();
}
}
module.exports = Database;