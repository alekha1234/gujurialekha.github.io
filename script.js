var icon = document.getElementById("icon")
icon.onclick = function () {
    document.body.classList.toggle("dark-theme")
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/moon.png"
    } else {
        icon.src = "https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/sun.png"
    }
}


var menuIcon = document.querySelector('.menu-icon i');
var navMenu = document.querySelector('nav ul');

menuIcon.onclick = function () {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
};



// ========================================== Intro Section ==========================================


var typed = new Typed("#typed-text", {
    strings: [
        "<span class='data-scientist'>Data Scientist</span>",
        "<span class='ai-enthusiast'>AI Enthusiast</span>",
    ],
    typeSpeed: 30,
    backSpeed: 20,
    backDelay: 1000,
    loop: true,
});


// ========================================== About Section ==========================================

document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("toggle-about");
    var fullAbout = document.getElementById("full-about");

    toggleBtn.onclick = function () {
        if (fullAbout.style.display === "none" || fullAbout.style.display === "") {
            fullAbout.style.display = "block";
            toggleBtn.innerText = "Read Less";
        } else {
            fullAbout.style.display = "none";
            toggleBtn.innerText = "Read More";
        }
    };
});



// ========================================== Experience Section ==========================================
document.addEventListener("DOMContentLoaded", function () {
    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = endDate === 'present' ? new Date() : new Date(endDate);

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();

        // Adjust years and months if months are negative
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months };
    }

    const dateRanges = document.querySelectorAll('.date-range');

    dateRanges.forEach(function (dateRange) {
        const startDate = dateRange.getAttribute('data-start');
        const endDate = dateRange.getAttribute('data-end');
        const duration = calculateDuration(startDate, endDate);

        let durationText = '';
        if (duration.years > 0) {
            durationText += `${duration.years} year${duration.years > 1 ? 's' : ''}`;
        }
        if (duration.months > 0) {
            if (duration.years > 0) {
                durationText += ' and ';
            }
            durationText += `${duration.months} month${duration.months > 1 ? 's' : ''}`;
        }
        if (duration.years === 0 && duration.months === 0) {
            durationText = 'Less than a month'; // Edge case
        }

        dateRange.querySelector('.duration').textContent = `(${durationText})`;
    });
});


// ========================================== Projects Section ==========================================

 // ========================================== Projects Section ==========================================

 document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.project-grid');
    const projects = Array.from(projectsContainer.children);
    const itemsPerRow = 3; // Number of items you want per row

    // Determine number of projects to show
    const totalProjects = projects.length;
    const visibleProjectsCount = Math.floor(totalProjects / itemsPerRow) * itemsPerRow;

    // Hide the projects that don't fit into the full rows
    projects.forEach((project, index) => {
        if (index >= visibleProjectsCount) {
            project.style.display = 'none';
        } else {
            project.style.display = 'block';
        }
    });
});
// ================================== Contact Submission Reset  ===========================================


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear the form fields
            form.reset();
            alert('Thanks for Contacting!');
        } else {
            alert('There was an error sending your message.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message.');
    });
});

// ================================== Scroll up button  ===========================================

// Show the button when scrolled down 100px from the top
window.onscroll = function () {
    const scrollUpBtn = document.getElementById("scrollUpBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollUpBtn.style.display = "block";
    } else {
        scrollUpBtn.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
document.getElementById("scrollUpBtn").onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
