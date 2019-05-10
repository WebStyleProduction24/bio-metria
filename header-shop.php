 <?php echo socials_float(); ?>

  <!-- HEADER --> 
  <header class="header header_inner">
  	<div class="container-fluid header-top">
  		<a class="header-logo" href="/">
  			<img src="<?php echo get_template_directory_uri();?>/img/logo.svg" class="header-logo__img" alt="">
  		</a>

  		<?php echo woocommerce_breadcrumb(); ?>

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
  </header>

<!-- HEADER [END] -->