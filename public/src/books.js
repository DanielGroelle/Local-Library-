function findAuthorById(authors, id) {
	return authors.find((author)=>author.id===id);
}

function findBookById(books, id) {
	return books.find((book)=>book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
	return books.reduce((partitionedBooks, book)=>{
		//index 0 adds the book to the "unreturned" array
		//index 1 adds the book to the "returned" array
		let index = (!book.borrows[0].returned ? 0 : 1);
		partitionedBooks[index].push(book);
		return partitionedBooks;
	}, [[],[]]);
}

//i tried using .reduce and .forEach() but i couldnt get them to work easily so i just went with this
function getBorrowersForBook(book, accounts) {
	let borrowerAccounts = [];
	for (let account of accounts) {
		//finding the borrow object that pertains to the given account
		let bookBorrowedAccount =  book.borrows.find((borrow)=>borrow.id === account.id);
		if (bookBorrowedAccount != undefined) {
			//getting the returned status of the book to populate in borrowerAccounts
			let returned = bookBorrowedAccount.returned;
			borrowerAccounts.push({returned, ...account})
			//once we have 10 accounts in the array we are done
			if (borrowerAccounts.length === 10) break;
		}
	}

	return borrowerAccounts;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
