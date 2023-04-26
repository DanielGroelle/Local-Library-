function findAccountById(accounts, id) {
	//returning the account object for an id
	return accounts.find((account)=> account.id === id);
}

function sortAccountsByLastName(accounts) {
	return accounts.sort((account1, account2)=>{
		//last name increasing alphabetical
		return (account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1)
	});
}

function getTotalNumberOfBorrows(account, books) {
	//returning the length of the filtered array of books
	//(number of books an account has borrowed)
	return books.filter((book)=>{
		//checking if borrows of a book have a matching id to account.id
		return book.borrows.some((borrow)=> borrow.id===account.id);
	}).length;
}

function getBooksPossessedByAccount(account, books, authors) {
	return books.reduce((booksPossessedByAccount, book)=>{
		//check if the most recent borrowing of a book has returned set to false
		//and matches the given account id
		let recentBorrow = book.borrows[0];
		if (recentBorrow.id === account.id && !recentBorrow.returned) {
			//find the right author object to populate booksPossessedByAccount
			let author = findAuthorById(authors, book.authorId);
			//let author = authors.find((author)=>author.id===book.authorId);
			booksPossessedByAccount.push({...book, author});
		}
		return booksPossessedByAccount;
	}, []);
}

function findAuthorById(authors, id) {
	return authors.find((author)=>author.id===id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
