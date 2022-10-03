const db = require('../config/connection');
const Database = require('./database');

module.exports = {
    show(meat)//which table is shoved in through the meat variable
    {
        let msg = ``;
        switch (meat) {
            case 'department':
                msg = `SELECT * FROM department`;
                
                break;
            case "role":
                msg = `SELECT  role.id, role.title, role.department_id, role.salary 
                FROM role`

                
                break;
            case "employee":
                msg = `SELECT employee.id, employee.first_name, employee.last_name,
                 role.title,department.name, role.salary, employee.manager FROM employee INNER JOIN role ON employee.role_id = role.id
                 INNER JOIN department ON role.department_id = department.id;`
                
                
                break;
            
            default:
                break;
        }
        db.query(msg,(err,res)=> {
            if(err){
                console.log(err);
                return this.init();
            }
            console.log("\n\n")
            console.table(res);
            console.log('\n\n\n\n\n\n');
        });
    },
    
};
