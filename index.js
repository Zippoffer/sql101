'use strict'

const {Database} = require('sqlite3').verbose()

const db = new Database('db/Chinook_Sqlite.sqlite')

const Table = require('cli-table');

db.serialize(() => {


	// db.all(`
	// 	SELECT 
	// 				Customer.FirstName || ' ' || Customer.LastName AS Name,
	// 				Customer.CustomerId,
	// 				Country
	// 	FROM 	Customer
	// 	WHERE Customer.Country IS NOT 'USA'
	// 	`, (err, customers)=> {
	// 		console.log("#1",customers)
	// 	})


	// 	db.all(`
	// 	SELECT 
	// 				Customer.FirstName || ' ' || Customer.LastName AS Name,
	// 				Customer.CustomerId,
	// 				Country
	// 	FROM 	Customer
	// 	WHERE Customer.Country = 'Brazil'
	// 	`, (err, customers)=> {
	// 		console.log("#2",customers)
	// 	})


	// 	// db.all(`
	// 	// SELECT 
	// 	// 			Customer.FirstName || ' ' || Customer.LastName AS Name,
	// 	// 			Customer.CustomerId,
	// 	// 			Country
	// 	// FROM 	Customer
	// 	// WHERE Country = 'Brazil'
	// 	// `, (err, customers)=> {
	// 	// 	customers.forEach(({CustomerId, Name, Country})=>{
	// 	// 	console.log('#3', `${CustomerId}: ${Name} (${Country})`)
				
	// 	// 	})
	// 	// })


	// 	db.each(`
 //    SELECT FirstName || ' ' || LastName AS 'Name',
 //           CustomerId,
 //           Country
 //    FROM   Customer
 //    WHERE  Country IS 'Brazil'
 //  `, (err, { CustomerId, Name, Country }) => {
 //    console.log('##3',`${CustomerId}: ${Name} (${Country})`)
 //  })


		// db.each(`
		// SELECT 
		// 			Customer.FirstName || ' ' || Customer.LastName AS Name,
		// 			Invoice.InvoiceId,
		// 			Invoice.InvoiceDate,
		// 			Invoice.BillingCountry
		// FROM 	Invoice
		// JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
		// WHERE Customer.Country = 'Brazil'
		// `, (err, row)=> {
		// 	console.log("#4",row)
		// })



	// db.each(`
	// 	SELECT 
	// 				Customer.FirstName || ' ' || Customer.LastName AS Name,
	// 				Invoice.InvoiceId,
	// 				Invoice.InvoiceDate,
	// 				Invoice.BillingCountry
	// 	FROM 	Invoice
	// 	JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
	// 	WHERE Customer.Country = 'Brazil'
	// 	`, (err, row)=> {
	// 			table.push(
	// 	   [row.InvoiceId, row.InvoiceDate, row.BillingCountry, row.Name]
	// 	);

	// 	}, ()=>{
	// 		console.log(table.toString())
	// 	})

	// 	const table = new Table({
	// 	    head: ['InvoiceId', 'InvoiceDate', 'Country', 'Name']
	// 	  , colWidths: [10, 20, 10, 20]
	// 	});
		 

		// db.each(`

		// 		SELECT Employee.FirstName || ' ' || Employee.LastName AS Name
		// 		FROM 	 Employee
		// 		WHERE  Employee.Title = 'Sales Support Agent'

		// 	`, (err, row) => {
		// 		table.push(
		// 			[row.Name]
		// 			)

		// 	}, ()=>{
		// 		console.log(table.toString())
		// 	})

		// const table = new Table({
		// 		head: ['Name']
		// 	, colWidths: [20]
		// });

});

db.close();




////////////////////////////////////////THE KNEX ZONE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: 'db/Chinook_Sqlite.sqlite',
	},
	useNullAsDefault: true,
})
// const knex = require('knex')({
//   client: 'pg',
//   connection: 'postgres://localhost:5432/chinook',
// })

// console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')
// // SELECT UNIQUE(country) FROM Invoice
// // console.log(knex.select('*').from('Invoice').then(console.log))   // these are the same
// // knex('Invoice').select('*').then(console.log)													//these are the same
// // knex('Invoice').then(console.log)																//these are the same  
// knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(console.log)																//these are the same  


// console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')
// knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(data => {
//   debugger
//   console.log(JSON.stringify(data))
// })



// console.log('6. Provide a query showing the invoices of customers who are from Brazil.')
// // SELECT * FROM INVOICES WHERE BILLINGINGCOUNTRY = BRAZIL
// knex('Invoice').where('BillingCountry', 'Brazil').then(console.log)




////this one was written for sqlite\\\\\
// console.log('7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agents full name.')

// knex('Invoice')
//   .select(knex.raw(`
//     Employee.FirstName || ' ' || Employee.LastName as SalesAgent,
//     Invoice.*
//   `))
//   .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//   .join('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
//   .then(console.log)



//////this one was change to work with postgres, but works with both\\\\\\
// console.log(`7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.`)
// knex('Invoice')
//   .select(knex.raw(`"Employee"."FirstName" || ' ' || "Employee"."LastName" as SalesAgent`))
//   .select('Invoice.*')
//   .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//   .join('Employee', 'SupportRepId', 'EmployeeId')
//   .then(console.log)


// console.log(`8.Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)

// knex('Invoice')
//   .select(knex.raw(`
//     Invoice.Total as InvoiceTotal, Customer.FirstName || ' ' || Customer.LastName as Name, Customer.Country, Employee.FirstName ||''|| Employee.LastName as SalesAgent,
//     Invoice.*
//   `))
//   // .sum('Invoice.Total as Total')
//   // .groupBy('Customer.CustomerId')
//   .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//   .join('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
//   // .orderBy('Total', 'desc')
//   .then(console.log)

//the above is mine, the below is scotts. i think mine works, but the below is more accurate
//this one was written for sqlite\\\\\\
// console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
// knex('Invoice')
//   .select(knex.raw(`Employee.FirstName || ' ' || Employee.LastName as SalesAgent`))
//   .select(knex.raw(`Customer.FirstName || ' ' || Customer.LastName as Customer`))
//   .select('Customer.Country')
//   .select('Customer.CustomerId')
//   .sum('Invoice.Total as Total')
//   .groupBy('Customer.CustomerId')
//   .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//   .join('Employee', 'SupportRepId', 'EmployeeId')
//   .orderBy('Total', 'desc')
//   .then(console.log)

//this one was written for postgres, and works on both\\\\\
console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
knex('Invoice')
  .select(knex.raw(`"Employee"."FirstName" || ' ' || "Employee"."LastName" as SalesAgent`))
  .select(knex.raw(`"Customer"."FirstName" || ' ' || "Customer"."LastName" as Customer`))
  .select('Customer.Country')
  .sum('Invoice.Total as Total')
  .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
  .join('Employee', 'SupportRepId', 'EmployeeId')
  .groupBy('Customer.CustomerId', 'Employee.FirstName', 'Employee.LastName')
  .orderBy('Total', 'desc')
  .then(console.log)




knex.destroy()   //this terminates the connections











