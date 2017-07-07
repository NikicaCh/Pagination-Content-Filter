const students = $('.student-list li'); 
const pagination = $('.pagination');
let matched = [];

const addSearch = () => {
    let search = '<input id="search-input" type="text" placeholder="Search for a student" >';
    search += '<button name="button" id="search-btn"> Search </button> ';
    $('.search').append(search);
}

/*
the function showPage takes a page number and a list of students as arguments, 
and display only 10 of the students.The rest are hided.
*/
const showPage = (pageNumber, list) => {
    $(list).hide(); // first we hide all of the students. 
    let index1 = pageNumber*10 -10; //the starting index of the new 10 student list
    let index2 = pageNumber*10; // the finishing index
    $(list).slice(index1, index2).show(); //we slice the list from the first to the last index and show them on the page.
} 
/* 
the function appendPageLinks takes a list of students as an argument
and displays page links depending of the number of students in the list
*/
const appendPageLinks = (lists) => {
    let linkNum = 0;
    linkNum = Math.ceil(lists.length/10);
      // calculate the number of page links needed
    for(let i = 1; i <= linkNum; i += 1 ){  //create the links in the link var and append  them to the pagination div
        let link = '<li><a href="#"> ' + i + '</a></li>';
        $('.pagination').append(link);
        }
    $('.pagination li a').first().addClass('active'); // select the first link as default

    $('.pagination li a').on('click', function () { // on click event on the page links
        let pageSelection = parseInt($(this)[0].text); // take the number value of the button that represents the page we clicked and use it as an argument when calling the showPage function
	    showPage(pageSelection, lists);
	    $(".pagination li a").removeClass(); // remove the active class from the first button
        $(this).addClass("active"); // and add the active class to the button clicked
    });
}

$('.search').on('click', function (event) {
    if(event.target.id === 'search-btn') {
        let input = $('#search-input').val().toLowerCase();
        console.log(input);
        let student = $('.student-details h3');
        matched = [];
        $(student).each(function() {
            let studentName = $(this).text().toLowerCase();
            let studentEmail = $(this).next().text();
            if(studentName.indexOf(input) > -1 || studentEmail.indexOf(input) > -1) {
                console.log('found');
                let parentDiv = $(this).parent().parent()[0];
				matched.push(parentDiv);	
            } 
        });
        $(students).hide();
        $('.pagination li').hide();
        showPage(1, matched);
        if(matched.length > 10) {
           appendPageLinks(matched);          
        } 
        if(matched.length === 0) {
            alert('No results found');
        }
        
    }


});

//On initialisation call the appendPageLinks function with the students list arg
//and call the showPage function to display the first 10 students.
appendPageLinks(students);
showPage(1,students);
addSearch();
