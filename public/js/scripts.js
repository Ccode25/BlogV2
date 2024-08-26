
    let scrollPos = 0;
    const mainNav = $('#mainNav');
    const headerHeight = mainNav.height();

    $(window).on('scroll', function() {
        const currentTop = $(document).scrollTop();
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.hasClass('is-fixed')) {
                mainNav.addClass('is-visible');
            } else {
                mainNav.removeClass('is-visible is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.removeClass('is-visible');
            if (currentTop > headerHeight && !mainNav.hasClass('is-fixed')) {
                mainNav.addClass('is-fixed');
            }
        }
        scrollPos = currentTop;
    });

     
   

    // Handle read more click event
    $('#card-container').on('click', '.read-more', function() {
        const title = $(this).data('title');
        const content = $(this).data('content');
        
        // Set the modal title and content
        $('#readMoreModalLabel').text(title);
        $('#modalContent').text(content);

        // Show the modal
        $('#readMoreModal').modal('show');
    });
