<?php get_header(); ?>

<section class="main main_inner">

	<div class="container">

		<h1 class="product-desc__title"><?php echo get_the_title(get_queried_object_id()); ?></h1>
		
		<?php 

		global $query_string; // параметры базового запроса
		query_posts( $query_string );
		?>

		<?php if( have_posts() ){ while( have_posts() ){ the_post(); ?>

			<div class="col-10 blog">
				<div class="row">
				<div class="col-4"><img src="<?php echo get_the_post_thumbnail_url(); ?>" alt=""></div>
				<div class="col-8">
					<p class="category-list__name"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>
					<?php the_content(); ?>
					<a href="<?php the_permalink(); ?>" class="btn btn_back articles__link">Читать статью</a>
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
	echo "<h2>Записей нет.</h2>";
?>
</div>
</section>



<?php get_footer(); ?>