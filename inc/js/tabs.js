document.addEventListener('DOMContentLoaded', function () {
    const tabsContainers = document.querySelectorAll('.tabs');

    tabsContainers.forEach((tabsContainer) => {
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        const tabContents = tabsContainer.querySelectorAll('.tab-content > div');

        // Add click event to each tab button
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                // Remove 'active' class from all buttons and hide all tab content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.style.display = 'none');

                // Add 'active' class to the clicked button 
                button.classList.add('active');
                tabContents[index].style.display = 'block';
            });
        });

        // Show the first tab content by default
        tabContents.forEach((content, index) => {
            content.style.display = index === 0 ? 'block' : 'none';
        });
    });
});