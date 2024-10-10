// Smooth scrolling
$('a.nav-link').on('click', function(event) {
    event.preventDefault();
    const target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 800);
});

// Fade-in effect for sections
$(window).on('scroll', function() {
    $('.fade-in').each(function() {
        const elementBottom = $(this).offset().top + $(this).outerHeight();
        const viewportBottom = $(window).scrollTop() + $(window).height();
        
        if (elementBottom < viewportBottom) {
            $(this).addClass('visible');
        }
    });
});

// Scroll to top button
$(window).on('scroll', function() {
    if ($(this).scrollTop() > 300) {
        $('#scrollToTop').fadeIn();
    } else {
        $('#scrollToTop').fadeOut();
    }
});

$('#scrollToTop').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
});


document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('ratingMessage');
    const savedRating = localStorage.getItem('websiteRating');

    // Display saved rating
    if (savedRating) {
        setRating(savedRating);
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            localStorage.setItem('websiteRating', rating);
            setRating(rating);
            ratingMessage.textContent = `Thank you for rating! You rated this website ${rating} star${rating > 1 ? 's' : ''}.`;
        });

        star.addEventListener('mouseover', () => {
            highlightStars(star.getAttribute('data-value'));
        });

        star.addEventListener('mouseleave', () => {
            if (savedRating) {
                highlightStars(savedRating);
            } else {
                resetStars();
            }
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            star.classList.remove('selected');
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            }
        });
    }

    function resetStars() {
        stars.forEach(star => star.classList.remove('selected'));
    }

    function setRating(rating) {
        highlightStars(rating);
    }
});
