<?php get_header(); ?>

<?php get_template_part('templates/equipment','programs');?>

<section class="main">
  <div class="container">
    <div class="about row">
      <div class="col-lg-6">
        <span class="title">О компании</span>
        <p class="about__text">
          Если ваше внимание привлекла эта страница, значит вы точно понимаете, что уровень личной или коммерческой безопасности, учета и анализа приходящей информации должен переходить на более высокую ступень. Такой уровень готовы обеспечить биометрические системы, позволяющие безошибочно аутентифицировать, зарегистрировать человека, посетителя, сотрудника по физиологическим параметрам или поведенческим особенностям.Основная, и самая популярная задача, которую вы сможете решить с их помощью — это одновременные контроль доступа, посещаемости и учёта рабочего времени персонала. Кто? Точно ли он? Где и когда? Вы будете точно знать кто находится на вашей территории и зачем. 
          <br><br>
          Интеграционные решения в области identication это современно, это повышает эффективность и сохраняет управляемость компании. Абсолютная коммерческая тайна. А биометрическая подпись говорит сама за себя.
        </p>
        <a class="btn text-right" href="/catalog">Подробнее о компании</a>
      </div>
      <div class="col-lg-6">
        <img class="about__img" src="<?php echo get_template_directory_uri(); ?>/img/about-img.jpg" alt="">
      </div>
    </div>
    <!-- <div class="proposition row">
      <div class="title-line col-lg-12">
        <span class="title title_bg">ПРЕДЛОЖЕНИЯ ПОД КЛЮЧ</span>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php // echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php // echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php // echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div> 
      <div class="col-lg-3 col-md-6">
        <div class="proposition__item">
          <img src="<?php // echo get_template_directory_uri(); ?>/img/proposition-img.png" alt="" class="proposition__img">
          <span class="proposition__title">Биометрическая подпись</span>
          <p class="proposition__text">Используйте данное программное обеспечение для удостоверения документов рукописной подписью в электронном виде. </p>
          <a class="btn" href="/catalog">Перейти в каталог</a>
        </div>
      </div>
    </div> -->
    <div class="partners row">
      <div class="title-line col-lg-12">
        <span class="title">Наши партнеры</span>
      </div> 
      <div class="partners__list col-lg-12">
        <img class="partners__img" src="<?php echo get_template_directory_uri(); ?>/img/partner-1.png" alt="">
        <img class="partners__img" src="<?php echo get_template_directory_uri(); ?>/img/partner-2.png" alt="">
        <img class="partners__img" src="<?php echo get_template_directory_uri(); ?>/img/partner-3.png" alt="">
        <img class="partners__img" src="<?php echo get_template_directory_uri(); ?>/img/partner-4.png" alt="">
        <img class="partners__img" src="<?php echo get_template_directory_uri(); ?>/img/partner-5.png" alt="">
      </div>
    </div>
    <!-- <div class="articles row">
      <div class="title-line col-lg-12">
        <span class="title">Статьи</span>
      </div> 
      <div class="articles__item col-lg-3 col-md-6">
        <img class="articles__img" src="<?php// echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
        <span class="articles__date">08.08.2018</span>
        <span class="articles__title">Название новости</span>
        <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
        <a class="articles__link" href="/catalog"></a> 
      </div>
      <div class="articles__item col-lg-3 col-md-6">
        <img class="articles__img" src="<?php// echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
        <span class="articles__date">08.08.2018</span>
        <span class="articles__title">Название новости</span>
        <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
        <a class="articles__link" href="/catalog"></a>
      </div>
      <div class="articles__item col-lg-3 col-md-6">
        <img class="articles__img" src="<?php// echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
        <span class="articles__date">08.08.2018</span>
        <span class="articles__title">Название новости</span>
        <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
        <a class="articles__link" href="/catalog"></a>
      </div>
      <div class="articles__item col-lg-3 col-md-6">
        <img class="articles__img" src="<?php// echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
        <span class="articles__date">08.08.2018</span>
        <span class="articles__title">Название новости</span>
        <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
        <a class="articles__link" href="/catalog"></a>
      </div>
      <a href="/catalog" class="btn articles_btn">Смотреть все новости</a>
    </div> -->
  </div>

</section>
</main>


<?php get_footer(); ?>