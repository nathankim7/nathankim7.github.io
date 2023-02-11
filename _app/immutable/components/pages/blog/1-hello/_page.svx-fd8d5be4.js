import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, a as space, l as claim_element, m as children, r as claim_text, h as detach, c as claim_space, b as insert_hydration, H as append_hydration, C as noop } from "../../../../chunks/index-83ca9dda.js";
function create_fragment(ctx) {
  let h1;
  let t0;
  let t1;
  let t2;
  let t3;
  let p;
  let t4;
  return {
    c() {
      h1 = element("h1");
      t0 = text(title);
      t1 = text(" by ");
      t2 = text(author);
      t3 = space();
      p = element("p");
      t4 = text("Some amazing content.");
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, title);
      t1 = claim_text(h1_nodes, " by ");
      t2 = claim_text(h1_nodes, author);
      h1_nodes.forEach(detach);
      t3 = claim_space(nodes);
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t4 = claim_text(p_nodes, "Some amazing content.");
      p_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      append_hydration(h1, t0);
      append_hydration(h1, t1);
      append_hydration(h1, t2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, p, anchor);
      append_hydration(p, t4);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(p);
    }
  };
}
const metadata = {
  "title": "Hello World!",
  "author": "Nathan Kim"
};
const { title, author } = metadata;
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default,
  metadata
};
