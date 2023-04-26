function getTotalBooksCount(books) {
	return books.length;
}

function getTotalAccountsCount(accounts) {
	return accounts.length;
}

function getBooksBorrowedCount(books) {
	//getting the length of a filtered array of books that havent been returned
	return books.filter((book)=>!book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
	//count the amount of books of a genre and put into an object
	let mostCommonGenres = books.reduce((genresObject, book)=>{
		let genre = book.genre;
		if (genresObject[genre] === undefined) {
			genresObject[genre] = {name: genre, count: 1};
		}
		else {
			genresObject[genre].count++;
		}
		return genresObject;
	}, {});

	//format properly into an array
	let mostCommonGenresArr = [];
	for (let genre in mostCommonGenres) {
		mostCommonGenresArr.push(mostCommonGenres[genre]);
	}

	//sort the genre counts from greatest to least
	mostCommonGenresArr.sort((genre1, genre2)=>{
		return genre2.count - genre1.count;
	});

	//limit the array to top 5
	while (mostCommonGenresArr.length > 5) {
		mostCommonGenresArr.pop();
	}

	return mostCommonGenresArr;
}

function getMostPopularBooks(books) {
	//generate popularBooks array with each element containing an object for a particular book
	//this object contains the title of the book along with the amount of borrows it has
	let popularBooks = books.map((book)=>({name: book.title, count: book.borrows.length}));

	//sort the popularity counts from greatest to least
	popularBooks.sort((book1, book2)=>{
		return book2.count - book1.count;
	});

	//limit the array to top 5
	while (popularBooks.length > 5) {
		popularBooks.pop();
	}

	return popularBooks;
}

function getMostPopularAuthors(books, authors) {
	//count the amount of borrows for an author and put into an object, then map to an array
	let popularAuthors = authors.map((author)=>{
		//generate a string of the author first and last name
		let authorName = `${author.name.first} ${author.name.last}`;
		//find the all books by the author and count up the borrows
		let count = books.reduce((count, book)=>{
			if (book.authorId===author.id) count += book.borrows.length;
			return count;
		}, 0);

		return {name: authorName, count};
	});

	//sort the popularity counts from greatest to least
	popularAuthors.sort((author1, author2)=>{
		return author2.count - author1.count;
	});

	//limit the array to top 5
	while (popularAuthors.length > 5) {
		popularAuthors.pop();
	}

	return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
