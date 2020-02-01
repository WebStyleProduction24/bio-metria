<?php get_header(); ?>



<section class="main main_inner mt-5">



	<div class="container">



		<h1 class="product-desc__title title-our-blog mb-4"><?php echo get_the_title(get_queried_object_id()); ?></h1>

		

		<?php 



		global $query_string; // параметры базового запроса

		query_posts( $query_string );

		?>



		<?php if( have_posts() ){ while( have_posts() ){ the_post(); ?>



			<div class="col-lg-10 blog">

				<div class="row">

					<div class="col-sm-4 px-0 px-sm-3"><a href="<?php the_permalink(); ?>">

	          <?php
	            if (has_post_thumbnail()) {
	              $post_thumbnail = get_the_post_thumbnail_url( $post, 'post-thumbnail' );
	            } else  $post_thumbnail = get_template_directory_uri().'/img/no-276_222.jpg';
	          ?>

						<img src="<?php echo $post_thumbnail; ?>" alt="">

					</a></div>

					<div class="col-sm-8">

						<div class="row align-items-end h-100">

							<p class="category-list__name"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>

							<?php the_excerpt(); ?>

							<div class="row justify-content-end w-100">

								<div class="col-lg-4 col-md-7">

									<a href="<?php the_permalink(); ?>" class="articles__link">Читать статью</a>

								</div>

							</div>

						</div>

					</div>

				</div>

				

			</div>



		<?php } /* конец while */ ?>



	<?php wp_reset_query(); // сброс запроса

	?>

<!-- 

	<div class="navigation">

		<div class="next-posts"><?php// next_posts_link(); ?></div>

		<div class="prev-posts"><?php //previous_posts_link(); ?></div>

	</div> -->



	<?php

} // конец if

else 

	echo "<h2>Статей нет.</h2>";

?>

</div>

</section>







<?php get_footer(); ?>