const tableField = document.querySelector("#tableField");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

const booksList = globalThis.data.books;
let currentBooks = booksList;

let count = 0;
let maxPages = 0;

const displayField = (books) => {
  tableField.innerHTML = "";
  maxPages = Math.ceil(books.length / 10) - 1;
  console.log("maxPages", maxPages);
  console.log("books", books);

  if (books.length == 0) {
    const h2 = document.createElement("h2");
    h2.innerText = "No books found";
    tableField.appendChild(h2);
  }

  displayFieldData(books);
};

const displayFieldData = (books) => {
  let n = (count + 1) * 10 < books.length ? (count + 1) * 10 : books.length;

  for (let i = count * 10; i < n; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "book-content");
    let contentImage = document.createElement("Img");
    contentImage.src = books[i][Object.keys(books[i])[1]];
    contentImage.style.maxWidth = "300px";
    contentImage.style.maxHeight = "400px";
    div.appendChild(contentImage);

    for (let j = 2; j < 6; j++) {
      let contentDiv = document.createElement("span");
      contentDiv.innerText = books[i][Object.keys(books[i])[j]];
      div.appendChild(contentDiv);
    }
    tableField.appendChild(div);
  }

  if (count === 0) prevButton.disabled = true;
  else prevButton.disabled = false;

  if (count === maxPages || maxPages < 0) nextButton.disabled = true;
  else nextButton.disabled = false;
};

const buttonOperation = () => {
  prevButton.addEventListener("click", () => {
    count--;
    console.log(count);
    displayField(currentBooks);
  });

  nextButton.addEventListener("click", () => {
    count++;
    console.log(count);
    displayField(currentBooks);
  });
};

const sortData = (criteria) => {
  console.log(criteria);
};

const filterData = () => {
  const books = booksList;
  const filter = document.querySelector("#filter-dialog");
  filter.showModal();

  const filterAuthor = document.querySelector("#filter-author");
  const filterSubject = document.querySelector("#filter-subject");
  const filterDate = document.querySelector("#filter-date");

  const getAuthorNames = new Set(books.map((book) => book.Author));

  if (filterAuthor.innerHTML === "") {
    for (let author of getAuthorNames) {
      let option = document.createElement("input");
      option.type = "checkbox";
      option.value = author;
      option.name = author;

      let label = document.createElement("label");
      label.innerText = author;
      label.setAttribute("for", author);

      filterAuthor.appendChild(option);
      filterAuthor.appendChild(label);
      filterAuthor.appendChild(document.createElement("br"));
    }
  }

  const getSubjectNames = new Set(books.map((book) => book.Subject));

  if (filterSubject.innerHTML === "") {
    for (let subject of getSubjectNames) {
      let option = document.createElement("input");
      option.type = "checkbox";
      option.value = subject;
      option.name = subject;

      let label = document.createElement("label");
      label.innerText = subject;
      label.setAttribute("for", subject);

      filterSubject.appendChild(option);
      filterSubject.appendChild(label);
      filterSubject.appendChild(document.createElement("br"));
    }
  }

  if (filterDate.innerHTML === "") {
    let option = document.createElement("input");
    option.type = "checkbox";
    option.value = "< 1900";
    option.name = "< 1900";
    let label = document.createElement("label");
    label.innerText = "< 1900";
    label.setAttribute("for", "< 1900");

    filterDate.appendChild(option);
    filterDate.appendChild(label);
    filterDate.appendChild(document.createElement("br"));

    option = document.createElement("input");
    option.type = "checkbox";
    option.value = "1900 - 2000";
    option.name = "1900 - 2000";
    label = document.createElement("label");
    label.innerText = "1900 - 2000";
    label.setAttribute("for", "1900 - 2000");

    filterDate.appendChild(option);
    filterDate.appendChild(label);
    filterDate.appendChild(document.createElement("br"));

    option = document.createElement("input");
    option.type = "checkbox";
    option.value = "> 2000";
    option.name = "> 2000";
    label = document.createElement("label");
    label.innerText = "> 2000";
    label.setAttribute("for", "> 2000");

    filterDate.appendChild(option);
    filterDate.appendChild(label);
    filterDate.appendChild(document.createElement("br"));
  }
};

const filterDataHandler = () => {
  const books = booksList;
  const filterAuthor = document.querySelector("#filter-author");
  const filterSubject = document.querySelector("#filter-subject");
  const filterDate = document.querySelector("#filter-date");
  const filter = document.querySelector("#filter-dialog");

  // Filter by Author
  const filterd = [];
  let authorCount = 0;
  for (let i = 0; i < filterAuthor.children.length; i++) {
    if (filterAuthor.children[i].checked) {
      authorCount++;
      filterd.push(filterAuthor.children[i].value);
    }
  }
  let filterdData = books.filter((book) => {
    return filterd.includes(book.Author);
  });

  // End of Filter by Author

  // Filter by Subject
  const subjects = [];
  let subjectCount = 0;
  for (let i = 0; i < filterSubject.children.length; i++) {
    if (filterSubject.children[i].checked) {
      subjects.push(filterSubject.children[i].value);
      subjectCount++;
    }
  }

  if (subjectCount !== 0) {
    if (filterdData.length === 0) {
      filterdData = books.filter((book) => {
        return subjects.includes(book.Subject);
      });
    } else {
      filterdData = filterdData.filter((book) => {
        return subjects.includes(book.Subject);
      });
    }
  }
  //End of Filter by Subject

  // Filter by Date
  const dates = [];
  let dateCount = 0;
  for (let i = 0; i < filterDate.children.length; i++) {
    if (filterDate.children[i].checked) {
      dates.push(filterDate.children[i].value);
      dateCount++;
    }
  }

  if (dateCount !== 0) {
    if (filterdData.length === 0) {
      for (let i = 0; i < dates.length; i++) {
        const tempData = books.filter((book) => {
          const year = parseInt(book.Year.substring(0, 4));
          if (dates[i] === "< 1900") {
            return year < 1900;
          } else if (dates[i] === "1900 - 2000") {
            return year >= 1900 && year <= 2000;
          } else if (dates[i] === "> 2000") {
            return year > 2000;
          }
        });
        filterdData = tempData;
      }
    } else {
      for (let i = 0; i < dates.length; i++) {
        const tempData = filterdData.filter((book) => {
          const year = parseInt(book.Year.substring(0, 4));
          if (dates[i] === "< 1900") {
            return year < 1900;
          } else if (dates[i] === "1900 - 2000") {
            return year >= 1900 && year <= 2000;
          } else if (dates[i] === "> 2000") {
            return year > 2000;
          }
        });
        filterdData = tempData;
      }
    }
  }
  //End of Filter by Date

  count = 0;
  if (
    (authorCount > 0 || subjectCount > 0 || dateCount > 0) &&
    filterdData.length == 0
  ) {
    currentBooks = [];
    filter.close();
    displayField([]);
  } else if (filterdData.length === 0) {
    currentBooks = books;
    displayField(currentBooks);
    filter.close();
  } else {
    currentBooks = filterdData;
    displayField(currentBooks);
    filter.close();
  }
};

displayField(booksList);
buttonOperation();
