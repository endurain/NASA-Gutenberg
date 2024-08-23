<!-- rover-slider-template.php -->
<div class="rover-slider">
    <h2><?php echo esc_html($heading); ?></h2>
    <p><?php echo esc_html($description); ?></p>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <?php foreach ($photos as $photo) : ?>
                <div class="swiper-slide">
                    <img src="<?php echo esc_url($photo['img_src']); ?>" alt="Mars Rover Image" />
                    <p><?php echo $photo['camera']['full_name']; ?></p>
                </div>
            <?php endforeach; ?>
        </div> <!-- End swiper-wrapper -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div> <!-- End swiper-container -->
</div> <!-- End rover-slider -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
        });
    });
</script>