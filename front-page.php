<?php get_header(); ?>



<main role="main">
    <div class="social social_blue">
        <a class="social__link" href="#"><i class="fab fa-telegram-plane"></i></a>
        <a class="social__link" href="#"><i class="fab fa-whatsapp"></i></a>
        <a class="social__link" href="#"><i class="fab fa-skype"></i></a>
    </div>
    <!-- HEADER -->
    <header class="header">
        <div class="container-fluid header-top">
            <a class="header-logo">
                <img src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" class="header-logo__img" alt="">
            </a>
            <div class="header-right">
                <div class="header-phone">
                    <a class="header-phone__link" href="tel:74952054700">+7 (495) 205-47-00</a>
                    <a class="header-phone__link" href="tel:79260040137">+7 (926) 004-01-37</a>
                </div>
                <button type="button" class="drawer-toggle drawer-hamburger">
                    <span class="drawer-hamburger-icon"></span>
                </button>
                <?php echo main_menu(); ?>
            </div>
        </div>
        <div class="container">

            <?php get_template_part('templates/slider', 'offers'); ?>

            <div class="particle">
                <img id="emmet" class="next-particle" data-width="500" data-height="400" data-max-width="85%" data-max-height="85%" data-particle-gap="3" data-mouse-force="80" data-noise="30" data-gravity="0.05" data-init-position="bottom" data-init-direction="bottom" data-fade-position="random" data-fade-direction="random" src="<?php echo get_template_directory_uri(); ?>/pic/palec.png" display:none;>
            </div>
        </div>
    </header><!-- HEADER [END] -->

    <?php get_template_part('templates/svg');?>

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
                    <a class="btn text-right" href="#">Подробнее о компании</a>
                </div>
                <div class="col-lg-6">
                    <img class="about__img" src="<?php echo get_template_directory_uri(); ?>/img/about-img.jpg" alt="">
                </div>
            </div>
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
            <div class="articles row">
                <div class="title-line col-lg-12">
                    <span class="title">Статьи</span>
                </div>
                <div class="articles__item col-lg-3 col-md-6">
                    <img class="articles__img" src="<?php echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
                    <span class="articles__date">08.08.2018</span>
                    <span class="articles__title">Название новости</span>
                    <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
                    <a class="articles__link" href="#"></a>
                </div>
                <div class="articles__item col-lg-3 col-md-6">
                    <img class="articles__img" src="<?php echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
                    <span class="articles__date">08.08.2018</span>
                    <span class="articles__title">Название новости</span>
                    <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
                    <a class="articles__link" href="#"></a>
                </div>
                <div class="articles__item col-lg-3 col-md-6">
                    <img class="articles__img" src="<?php echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
                    <span class="articles__date">08.08.2018</span>
                    <span class="articles__title">Название новости</span>
                    <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
                    <a class="articles__link" href="#"></a>
                </div>
                <div class="articles__item col-lg-3 col-md-6">
                    <img class="articles__img" src="<?php echo get_template_directory_uri(); ?>/img/article-img.jpg" alt="">
                    <span class="articles__date">08.08.2018</span>
                    <span class="articles__title">Название новости</span>
                    <p class="articles__text">Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой...</p>
                    <a class="articles__link" href="#"></a>
                </div>
                <a href="#" class="btn articles_btn">Смотреть все новости</a>
            </div>
        </div>
    </section>
    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-top container-fluid">
            <div class="footer-left">
                <a href="#"><img class="footer__logo" src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" alt=""></a>
                <span class="footer__time">Пн-Пт: с 9:00 до 20:00<br>
                Сб-Вс: с 10:00 до 16:00</span>
                <span class="footer__location">105118, г. Москва, <br>
                ул. Буракова, д. 27</span>
            </div>
            <div class="footer-center">
                <ul class="footer-list">
                    <li class="footer-list__item"><a href="#" class="footer-list__link">О компании</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Биометрическая подпись документов</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Система регистрации посетителей</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Контроль и управление доступом</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Учёт рабочего времени сотрудников</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Удалённый доступ к системам web-клиент</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Планшеты биометрической подписи</a></li>
                </ul>
                <ul class="footer-list">
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Читатели RFID, ладони, отпечатка, лица</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Kaiser Fototechnik</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Сканеры документов</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Криминалистическое оборудование</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">Наш блог</a></li>
                    <li class="footer-list__item"><a href="#" class="footer-list__link">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-right">
                <a class="footer__phone" href="call:+74952054700">+7 (495) 205-47-00</a>
                <a class="footer__phone" href="call:+79260040137">+7 (926) 004-01-37</a>
                <a class="footer__email" href="#">info@bio-metria.ru</a>
                <div class="footer-social">
                    <span class="footer-social__name">Мы в социальных сетях:</span>
                    <a class="footer-social__link"><i class="fab fa-facebook-f"></i></a>
                    <a class="footer-social__link"><i class="fab fa-google"></i></a>
                    <a class="footer-social__link"><i class="fab fa-skype"></i></a>
                    <a class="footer-social__link"><i class="fab fa-whatsapp"></i></a>
                    <a class="footer-social__link"><i class="fab fa-telegram-plane"></i></a>
                </div>
                <a class="btn footer_btn" href="#">Заказать звонок</a>
            </div>
        </div>
        <div class="footer-bottom container-fluid">
            <span class="footer-copyright">© Copyright 2018. Биометрия | Автоматизированные системы распознавания</span>
            <div class="footer-develop">
                <span class="footer-develop__text">Разработка дизайна:</span>
                <img class="footer-develop__logo" src="<?php echo get_template_directory_uri(); ?>/img/developer.svg">
            </div>
        </div>
    </footer><!-- FOOTER END -->
</div>
</main>


<?php get_footer(); ?>