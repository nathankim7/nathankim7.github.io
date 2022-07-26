<script lang="ts">
	import { base } from '$app/paths';
	import Ants from '$lib/ants.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
	<!-- <script src="static/two.min.js"></script> -->
</svelte:head>

<div class="flex justify-center w-100 h-100">
	<Ants />
	<div id="content" class="flex flex-column flex-auto pa3">
		<p id="tit" class="f1-ns tc ma0 b flex items-center justify-center w-100">
			NATHAN KIM<img style="height: 1em" class="ph2" src="{base}/favicon.svg" alt="logo" />
		</p>
		<hr class="w-100 ma0 mt3" style="border: 2px solid black" />
		<!-- <div id="links" class="flex w-100 justify-center flex-wrap mt3">
            <a class="i f3 mh2 mb2" href="https://github.com/nathankim7">github</a>
            <a class="i f3 mh2 mb2" href="https://www.linkedin.com/in/nathan-kim-71b568155/">linkedin</a>
            <a class="i f3 mh2 mb2" href="#">resume</a>
            <p class="i f3 ml2 mt0 mb3 mr0">contact: <a href="#">nathangk@stanford.edu</a></p>
        </div> -->
		<span style="font-size: 1.3rem; line-height: 1.3em" class="ma0 mt3 w-100 content">
			Hi! I'm a sophomore student at Stanford University interested in
			<p class="rainbow-text">computers</p>
			and
			<p class="rainbow-text">language</p>
			and especially
			<p class="rainbow-text">things that combine the two</p>
			. Intermittently, I've also been a full-stack web dev and an Android developer. Feel free to check
			out my code on<a href="https://github.com/nathankim7">Github</a>, connect with me on
			<a href="https://www.linkedin.com/in/nathan-kim-71b568155/">Linkedin</a>, and take my
			<a href="{base}/files/Nathan_Kim_Resume.pdf">resume</a>. Any questions or comments can be
			directed to me by filling in the blanks at
			<a href={base}>na&#116;&#104;angk&#64;st_n&#102;_rd&#46;edu</a>.
		</span>
		<!-- <ul style="font-size: 1.3rem" class="mt2 ma0 mb5 pl3">
            <li>if</li>
            <li>i have</li>
            <li>something</li>
        </ul> -->
		<p id="tit2" class="f2-ns tc ma0 mt5 mb2 w-100 b">things that might interest you</p>
		<hr class="w-100 ma0 mv2" style="border: 2px solid black" />
		<a class="mt2 f4 content" href="https://oddoneout.herokuapp.com/"
			>[Web App] Odd One Out: A Game of Words in Vector Semantics</a
		>
		<!-- <p class="f3 ma0 w-100 i tracked">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked" style="font-family: Arial">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked" style="font-family: Arial">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked" style="font-family: Arial">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked" style="font-family: Arial">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked">1234567890 !@#$%^&*()_+~{}|:"?</p>
        <p class="f3 ma0 w-100 i tracked" style="font-family: Arial">1234567890 !@#$%^&*()_+~{}|:"?</p> -->
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	:global(#bg) {
		position: absolute;
		z-index: 0;
	}

	#content {
		font-family: 'Work Sans', 'Helvetica', sans-serif;
		background-color: rgba(255, 255, 255, 0.9);
		z-index: 2;
		max-width: 50%;
	}

	.content {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media screen and (max-width: 400px) {
		#tit {
			font-size: 2.5rem;
		}

		#tit2 {
			font-size: 1.35rem;
			/* text-align: left; */
		}

		#content {
			padding-left: 1rem;
			padding-right: 1rem;
			max-width: 100%;
		}

		.content {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	.rainbow-text {
		background-image: linear-gradient(to left, violet, indigo, blue, green, indigo);
		-webkit-background-clip: text;
		color: transparent;
		display: inline;
	}

	a:link {
		color: #6ba9b3;
		font-weight: normal;
	}

	a:visited {
		color: #3d6166;
	}

	a:focus {
		background: #bacacc;
	}

	a:hover {
		background: #bacacc;
	}

	a:active {
	}
</style>
