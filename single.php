<?php get_header(); ?>

<section class="main main_inner mt-5">

	<div class="container">
		
		<?php if( have_posts() ){ while( have_posts() ){ the_post(); ?>

			<div class="row">
				<div class="col-4"><a href="<?php the_permalink(); ?>"><img src="<?php echo get_the_post_thumbnail_url(); ?>" alt=""></a></div>
				<div class="col-8">
					<h1 class="product-desc__title title-our-blog single"><?php the_title(); ?></h1>
					<?php the_content(); ?>

				</div>
			</div>


		<?php } /* конец while */ 

	}?>
</div>
</section>



<?php get_footer(); ?>