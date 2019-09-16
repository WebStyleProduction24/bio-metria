 <!-- HEADER --> 
 <header class="header header_inner">
   <div class="container-fluid header-top">
    <a class="header-logo" href="/">
     <img src="<?php echo get_template_directory_uri();?>/img/logo.svg" class="header-logo__img" alt="">
   </a>

   <div class="header-right row justify-content-end">
    <div class="header-phone col-6 col-md-5 col-lg-4 col-xl-2 overflow-hidden float-left">
      <?php echo socials_float(); ?>          
    </div>
    <div class="header-phone col-6 col-md-5 col-lg-3 col-xl-2 pr-0 overflow-hidden">
      <a class="header-phone__link" href="tel:74952054700">+7 (495) 205-47-00</a>
      <a class="header-phone__link" href="mailto:info@bio-metria.ru">info@bio-metria.ru</a>
    </div>
    <button type="button" class="drawer-toggle drawer-hamburger">
      <span class="drawer-hamburger-icon"></span>
    </button>
    <div class="d-none d-md-block"><?php echo main_menu(); ?></div>
    <div class="drawer-nav d-block d-lg-none">
     <?php echo main_menu(); ?>
     <div class="d-block d-sm-none">
      <h3>Категории продуктов:</h3>
      <?php echo category_list_menu(); ?>

    </div>
  </div>

</div>
</div>
</header>

<!-- HEADER [END] -->