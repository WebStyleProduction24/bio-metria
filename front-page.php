<?php get_header(); ?>

<?php get_template_part('templates/equipment','programs');?>

<section class="main">
  <div class="container">

<!-- Блок Предложения под ключ -->


    <div class="proposition row">
      <div class="title-line col-lg-12">
        <span class="title title_bg">ПРЕДЛОЖЕНИЯ ПОД КЛЮЧ</span>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div> 
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div>
    </div>

    <div class="articles row mb-5">      
      <div class="title-line col-lg-12">
        <span class="title">Статьи</span>
      </div>       

      <?php query_posts( 'post_type=post' ); ?>
      <?php get_excerpt_post(); ?>
      <?php if( have_posts() ){?>

        <section class="variable">
          <?php while( have_posts() ){ the_post(); ?>
            <div class="articles__item col-lg-3 col-md-6">
              <?php
                if (has_post_thumbnail()) {
                  $post_thumbnail = get_the_post_thumbnail_url( $post, 'hompage-post-thumbnail' );
                } else  $post_thumbnail = get_template_directory_uri().'/img/no-255_165.jpg';
              ?>
              <a href="<?php echo get_permalink(); ?>"><img class="articles__img" src="<?php echo $post_thumbnail; ?>" alt=""></a>
              <span class="articles__date"><?php the_time('d.m.Y'); ?></span>
              <a href="<?php echo get_permalink(); ?>" class="articles__title"><span><?php the_title(); ?></span></a>
              <?php the_excerpt(); ?>
              <a class="articles__link" href="<?php the_permalink(); ?>"></a>
            </div>
          <?php } ?>
        </section>

        <a href="/nash-blog" class="btn articles_btn">Смотреть все статьи</a>
    <?php } 
    else 
      echo "<h3>Статей нет.</h3>";
    ?>

    <?php wp_reset_query(); ?>


  </div>

  <div id="feedback">
    <a name="feedback"></a>

      <div class="title-line mb-5">
        <span class="title">Обратная связь</span>
      </div>       
    <?php echo do_shortcode('[contact-form-7 id="10433" title="Контактная форма 1"]'); ?>
  </div>

</section></main>
<?php get_footer(); ?>