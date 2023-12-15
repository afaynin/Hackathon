let page_num;
let key_delay;
const KEY_DELAY_DURATION = 500;
//https://afaynin.github.io/Hackathon/
//https://github.com/Astro0250/GWC_Hackathon23
//https://github.com/afaynin/Hackathon

// Highest level function - calls all lower level function
// Height self-explanitory, but note that width is the width of the book OPENED,
// so the width of a page will be half that.
// Pages is currently an array that holds the text for each page - will later be updated
// to take in actual elements, like a div with an image in it.
function create_book(width, height, content)
{
		let book = document.createElement("div");
		book.classList.add("book");
	
		// The book is centered relative to its front cover, so no need
		// To shift it to center it when its unopened.
		book.style.transform = "translateX(0%)";
		book.style.width = `${width}px`;
		book.style.height = `${height}px`;
		book.height = height;
		book.width = width;

		book.current_page = 0;
		// num_pages refers to pages as two-sided, with each side not constituting its own page
		book.num_pages = content.length / 2;

		for (let i = 0; i < book.num_pages; i++)
		{
				let page = create_page(i, content[2 * i], content[2* i + 1]);
				book.appendChild(page);
		}

		return book;
}

function create_page(page_num, front_content, back_content)
{
		let page = document.createElement("div");
		page.classList.add("page");
		page.style.zIndex = -page_num;

		page.flipped = false;

		let page_front = create_page_side(true, front_content);
		let page_back = create_page_side(false, back_content);

		page.appendChild(page_front);
		page.appendChild(page_back);

		return page;
}

function create_page_side(is_facing_front, content)
{
		let page_side = document.createElement("div");
		page_side.classList.add("page_side");
		page_side.classList.add(is_facing_front ? "page_front" : "page_back");
		page_side.appendChild(content);
	
		page_side.style.transform = `rotateY(${is_facing_front ? 0 : 180}deg)`;

		return page_side;
}

function flip_book(book, flip_forward)
{
		let out_of_bounds = (book.current_page === 0 && flip_forward === false) || (book.current_page === book.num_pages && flip_forward === true) 

		if (out_of_bounds)
		{
				for (let i = 0; i < book.num_pages; i++) setTimeout(() => flip_book(book, !flip_forward), i * 250 / book.num_pages);
		}
		else
		{
				flip_page(book, flip_forward);
		}

		book.style.transform = "translateX(25%)";
		if (book.current_page === 0) book.style.transform = "translateX(0%)";
		if (book.current_page === book.num_pages) book.style.transform = "translateX(50%)";
}

function flip_page(book, flip_forward)
{
		let page_num = book.current_page - 1 + flip_forward;
		let page = book.children[page_num];

		page.flipped = !page.flipped;
		page.style.transform = `rotateY(${page.flipped ? -180 : 0}deg)`
		page.style.zIndex = parseInt(page.style.zIndex) * -1;

		page.children[0].style.zIndex = + !page.flipped;
		page.children[1].style.zIndex = + page.flipped;

		book.current_page += 2 * flip_forward - 1;
}

function getBookContent() {
	const image_names = [
		"cover_0.png",
		"red_0.png",
		"red_1.png",
		"pink_0.png",
		"pink_1.png",
		"blue_0.png",
		"blue_1.png",
		"green_0.png",
		"green_1.png",
		"cover_1.png"
	]
	let content = [];

	for (let image of image_names) {
		let	page = document.createElement("img");
		page.src = `../images/${image}`;
		content.push(page);
	}

	return content;
}

function init_key_tracking()
{
	key_delay = false;
	
	addEventListener("keypress", key_pressed);
}

function key_pressed(e)
{
	if (key_delay) return;

	switch (e.key)
	{
		case "a":
			flip_book(document.querySelector(".book"), false);
			break;
			
		case "d":
			flip_book(document.querySelector(".book"), true);
			break;
			
		default:
			return;
			break;
	}

	key_delay = true;
	setTimeout(() => key_delay = false,KEY_DELAY_DURATION)
}