<template>
  	<div class="flex justify-center w-100 h-100">
		<ants id="bg" class="w-100 h-100"></ants>
		<div id="content" class="flex flex-column flex-auto pa3">
			<p id="tit" class="f1-ns tc ma0 b flex items-center justify-center w-100">NATHAN KIM<img style="height: 1em" class="ph2" src="./favicon.svg" alt="logo"></p>
			<hr class="w-100 ma0 mt2" style="border: 2px solid black">
			<!-- <div id="links" class="flex w-100 justify-center flex-wrap mt3">
				<a class="i f3 mh2 mb2" href="https://github.com/nathankim7">github</a>
				<a class="i f3 mh2 mb2" href="https://www.linkedin.com/in/nathan-kim-71b568155/">linkedin</a>
				<a class="i f3 mh2 mb2" href="#">resume</a>
				<p class="i f3 ml2 mt0 mb3 mr0">contact: <a href="#">nathangk@stanford.edu</a></p>
			</div> -->
			<p style="font-size: 1.3rem; line-height: 1.3em" class="ma0 mt3 w-100">Hi! I'm a freshman student at Stanford University interested in <p class="rainbow-text">computers</p> and <p class="rainbow-text">language</p> and especially <p class="rainbow-text">things that combine the two</p>. Intermittently, I've also been a full-stack web dev and an Android developer. Feel free to check out my code on <a href="https://github.com/nathankim7">Github</a>, connect with me on <a href="https://www.linkedin.com/in/nathan-kim-71b568155/">Linkedin</a>, and take my <a v-bind:href="cv">resume</a>. Any questions or comments can be directed to me by filling in the blanks at <a href="#">na&#116;&#104;angk&#64;st_n&#102;_rd&#46;edu</a>.</p>
			<!-- <ul style="font-size: 1.3rem" class="mt2 ma0 mb5 pl3">
				<li>if</li>
				<li>i have</li>
				<li>something</li>
			</ul> -->
			<p id="tit2" class="f2-ns tc ma0 mt5 w-100 b">things that might interest you</p>
			<hr class="w-100 ma0 mv2" style="border: 2px solid black">
			<a class="f4" href="https://oddoneout.herokuapp.com/">[Web App] Odd One Out: A Game of Words in Vector Semantics</a>
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
</template>

<script>
import Ants from './components/Ants.vue'
import cv from './Nathan Kim CV.pdf'

export default {
	name: 'App',
	components: {Ants},
	data() {
		return {
			cv: cv
		}
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Helvetica:ital,wght@0,400;0,700;1,400;1,700&display=swap');

#bg {
	position: absolute;
	z-index: 0;
}

#content {
	font-family: 'Work Sans', 'Helvetica', sans-serif;
	background-color: rgba(255, 255, 255, 0.9);
	z-index: 2;
	max-width: 50%;
}

@media screen and (max-width: 400px) {
	#tit {
		font-size: 2.5rem;
	}

	#tit2 {
		font-size: 1.35rem;
		text-align: left;
	}

	#content {
		padding-left: 1rem;
		padding-right: 1rem;
		max-width: 100%;
	}
}

.rainbow-text {
  background-image: linear-gradient(to left, violet, indigo, blue, green,indigo);   -webkit-background-clip: text;
  color: transparent;
  display: inline;
}

ul {
	list-style-type: none;
}

ul li::before {
	content: '+ ';
	font-weight: bold;
}

ul li {
	margin-bottom: 0.25rem;
}

a:link {
	color:#6ba9b3;
	font-weight: normal;
}

a:visited {
	color:#3d6166;
}

a:focus {
	background: #bacacc;
}

a:hover {
	background: #bacacc;
}

a:active {

}

/* @font-face {
	font-family: FreeSans;
	src: url('./fonts/FreeSans.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: FreeSans;
	src: url('./fonts/FreeSansBold.woff') format('woff');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: FreeSans;
	src: url('./fonts/FreeSansBoldOblique.woff') format('woff');
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: FreeSans;
	src: url('./fonts/FreeSansOblique.woff') format('woff');
	font-weight: normal;
	font-style: italic;
} */
</style>