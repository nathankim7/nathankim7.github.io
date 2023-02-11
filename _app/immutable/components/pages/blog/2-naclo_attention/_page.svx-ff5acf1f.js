import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, a as space, l as claim_element, m as children, r as claim_text, h as detach, c as claim_space, n as attr, b as insert_hydration, H as append_hydration, C as noop } from "../../../../chunks/index-83ca9dda.js";
function create_fragment(ctx) {
  let h1;
  let t0;
  let t1;
  let p0;
  let t2;
  let t3;
  let hr;
  let t4;
  let p1;
  let t5;
  let t6;
  let div;
  let t7;
  let i;
  let t8;
  let t9;
  let br;
  let t10;
  let p2;
  let t11;
  let t12;
  let p3;
  let t13;
  let t14;
  let p4;
  let a;
  let t15;
  let t16;
  let p5;
  let t17;
  let t18;
  let h3;
  let t19;
  return {
    c() {
      h1 = element("h1");
      t0 = text("[Video Tutorial] Pay Attention!");
      t1 = space();
      p0 = element("p");
      t2 = text("This year’s NACLO Open Round contest is happening on Thursday, January 28th, and I made a video walkthrough of one of my favourite problems to help get the word out!");
      t3 = space();
      hr = element("hr");
      t4 = space();
      p1 = element("p");
      t5 = text("For those who aren’t in the know, NACLO (the North American Computational Linguistics Open competition) is the foremost high school linguistics contest for students in the United States and Canada. It’s a proper three-hour, pen-and-paper contest, but the problems are probably unlike anything you’ve ever had to solve for an academic contest before: instead of angle bashing or reaction balancing, each problem will ask you only to look at some linguistic data—be they ancient tablets, Pho bar menus or encoding trees—and learn something about the language using only your own two eyes.");
      t6 = space();
      div = element("div");
      t7 = text("![Kucing besar suka anjing-anjing is the answer.](/images/indonesian.png)\n");
      i = element("i");
      t8 = text('How would you write "The big cat likes the dogs" in Indonesian?');
      t9 = space();
      br = element("br");
      t10 = space();
      p2 = element("p");
      t11 = text("And the best part is, you don’t even need to know any linguistics to get started! The problems are designed to lay everything you need out there for you, putting beginners and experts on the same playing field. Each and every problem will draw on different skills to solve.");
      t12 = space();
      p3 = element("p");
      t13 = text("Which brings me to the walkthrough video. I took one of my favourite NACLO problems in recent memory, Pay Attention (it’s about reverse-engineering attention heads, so all you NLP people, listen up), and walk through all the content and the background in a way that NACLO newbies and masters alike can pick up on. If you’re curious about the kind of reasoning we tend to look for on the NACLO contests and the content we seek to teach, this would be a great place to start!");
      t14 = space();
      p4 = element("p");
      a = element("a");
      t15 = text("Watch the video here!");
      t16 = space();
      p5 = element("p");
      t17 = text("If you liked what I put up, and you are a resident of the United States or Canada under the age of 20 and not enrolled in any post-secondary educational programs (homeschoolers welcome too!) whose primary language is English, please please please register for the upcoming NACLO contest to do more fun puzzles like this one! You can register for one of our in-person sites by January 27 or choose to do it at home by registering by January 15th. If you know any eligible students, please please spread the word as well!");
      t18 = space();
      h3 = element("h3");
      t19 = text("that’ll be all from me for now.");
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "[Video Tutorial] Pay Attention!");
      h1_nodes.forEach(detach);
      t1 = claim_space(nodes);
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t2 = claim_text(p0_nodes, "This year’s NACLO Open Round contest is happening on Thursday, January 28th, and I made a video walkthrough of one of my favourite problems to help get the word out!");
      p0_nodes.forEach(detach);
      t3 = claim_space(nodes);
      hr = claim_element(nodes, "HR", {});
      t4 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      t5 = claim_text(p1_nodes, "For those who aren’t in the know, NACLO (the North American Computational Linguistics Open competition) is the foremost high school linguistics contest for students in the United States and Canada. It’s a proper three-hour, pen-and-paper contest, but the problems are probably unlike anything you’ve ever had to solve for an academic contest before: instead of angle bashing or reaction balancing, each problem will ask you only to look at some linguistic data—be they ancient tablets, Pho bar menus or encoding trees—and learn something about the language using only your own two eyes.");
      p1_nodes.forEach(detach);
      t6 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { align: true });
      var div_nodes = children(div);
      t7 = claim_text(div_nodes, "![Kucing besar suka anjing-anjing is the answer.](/images/indonesian.png)\n");
      i = claim_element(div_nodes, "I", {});
      var i_nodes = children(i);
      t8 = claim_text(i_nodes, 'How would you write "The big cat likes the dogs" in Indonesian?');
      i_nodes.forEach(detach);
      div_nodes.forEach(detach);
      t9 = claim_space(nodes);
      br = claim_element(nodes, "BR", {});
      t10 = claim_space(nodes);
      p2 = claim_element(nodes, "P", {});
      var p2_nodes = children(p2);
      t11 = claim_text(p2_nodes, "And the best part is, you don’t even need to know any linguistics to get started! The problems are designed to lay everything you need out there for you, putting beginners and experts on the same playing field. Each and every problem will draw on different skills to solve.");
      p2_nodes.forEach(detach);
      t12 = claim_space(nodes);
      p3 = claim_element(nodes, "P", {});
      var p3_nodes = children(p3);
      t13 = claim_text(p3_nodes, "Which brings me to the walkthrough video. I took one of my favourite NACLO problems in recent memory, Pay Attention (it’s about reverse-engineering attention heads, so all you NLP people, listen up), and walk through all the content and the background in a way that NACLO newbies and masters alike can pick up on. If you’re curious about the kind of reasoning we tend to look for on the NACLO contests and the content we seek to teach, this would be a great place to start!");
      p3_nodes.forEach(detach);
      t14 = claim_space(nodes);
      p4 = claim_element(nodes, "P", {});
      var p4_nodes = children(p4);
      a = claim_element(p4_nodes, "A", { href: true, title: true, rel: true });
      var a_nodes = children(a);
      t15 = claim_text(a_nodes, "Watch the video here!");
      a_nodes.forEach(detach);
      p4_nodes.forEach(detach);
      t16 = claim_space(nodes);
      p5 = claim_element(nodes, "P", {});
      var p5_nodes = children(p5);
      t17 = claim_text(p5_nodes, "If you liked what I put up, and you are a resident of the United States or Canada under the age of 20 and not enrolled in any post-secondary educational programs (homeschoolers welcome too!) whose primary language is English, please please please register for the upcoming NACLO contest to do more fun puzzles like this one! You can register for one of our in-person sites by January 27 or choose to do it at home by registering by January 15th. If you know any eligible students, please please spread the word as well!");
      p5_nodes.forEach(detach);
      t18 = claim_space(nodes);
      h3 = claim_element(nodes, "H3", {});
      var h3_nodes = children(h3);
      t19 = claim_text(h3_nodes, "that’ll be all from me for now.");
      h3_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "align", "center");
      attr(a, "href", "https://www.google.com");
      attr(a, "title", "Google's Homepage");
      attr(a, "rel", "nofollow");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      append_hydration(h1, t0);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p0, anchor);
      append_hydration(p0, t2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, hr, anchor);
      insert_hydration(target, t4, anchor);
      insert_hydration(target, p1, anchor);
      append_hydration(p1, t5);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, div, anchor);
      append_hydration(div, t7);
      append_hydration(div, i);
      append_hydration(i, t8);
      insert_hydration(target, t9, anchor);
      insert_hydration(target, br, anchor);
      insert_hydration(target, t10, anchor);
      insert_hydration(target, p2, anchor);
      append_hydration(p2, t11);
      insert_hydration(target, t12, anchor);
      insert_hydration(target, p3, anchor);
      append_hydration(p3, t13);
      insert_hydration(target, t14, anchor);
      insert_hydration(target, p4, anchor);
      append_hydration(p4, a);
      append_hydration(a, t15);
      insert_hydration(target, t16, anchor);
      insert_hydration(target, p5, anchor);
      append_hydration(p5, t17);
      insert_hydration(target, t18, anchor);
      insert_hydration(target, h3, anchor);
      append_hydration(h3, t19);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(p0);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(hr);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(p1);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(div);
      if (detaching)
        detach(t9);
      if (detaching)
        detach(br);
      if (detaching)
        detach(t10);
      if (detaching)
        detach(p2);
      if (detaching)
        detach(t12);
      if (detaching)
        detach(p3);
      if (detaching)
        detach(t14);
      if (detaching)
        detach(p4);
      if (detaching)
        detach(t16);
      if (detaching)
        detach(p5);
      if (detaching)
        detach(t18);
      if (detaching)
        detach(h3);
    }
  };
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
