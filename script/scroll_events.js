const scroll_events = [];

function init_scroll_events()
{
	window.addEventListener("scroll", check_scroll_events)
}

function add_scroll_event(callback, element, scrollY)
{
	scroll_events.push({
		callback,
		element,
		scrollY
	});
}

function check_scroll_events()
{
	const completed_events = [];

	// Check events whose neccesary scroll amounts have been reached
	for (let event of scroll_events)
	{
		if (window.scrollY < event.scrollY) continue;
			
		event.callback(event.element);
		console.log("hiya!");
		completed_events.push(event);
	}

	// Remove triggered events to prevent recall.
	for (let event of completed_events)
	{
		let index = scroll_events.indexOf(event);
		scroll_events.splice(index, 1);
	}
}

function fly_in(element)
{
	element.style.transform = "translateX(0%)";
	element.style.opacity = "1";
}