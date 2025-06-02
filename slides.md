---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: /images/Gophers6.jpeg
# some information about your slides (markdown enabled)
title: Want to learn a new language? Let's Go!
info: |
  ## Want to learn a new language? Let's Go!
  Introduction to the Go langauge
class: text-center
# apply unocss classes to the current slide
layout: cover
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
exportFilename: go101
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev
---

# Want to learn a new language? Let's Go!

<div class="absolute bottom-10 text-left">
    <div>Michele Caci</div>
    <div>Senior Software Engineer at Amadeus</div>
    <div class="flex m-0 gap-1">
      <a href="https://github.com/mcaci" target="_blank" alt="Michele's GitHub" title="Michele's GitHub"
        class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
        <carbon-logo-github />
      </a>
      <a href="https://x.com/goMicheleCaci" target="_blank" alt="Michele's X" title="Michele's X"
        class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
        <carbon-logo-x />
      </a>
      <a href="https://www.linkedin.com/in/michele-caci-47770132/" target="_blank" alt="Michele's Linkedin" title="Michele's Linkedin"
        class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
        <carbon-logo-linkedin />
      </a>
    </div>
</div>

<img src="/images/go-logo-blue.svg" class="absolute bottom-10 right-10 text-right"/>

---
src: ./pages/intro.md
hide: true
---

---
src: ./pages/helloworld.md
hide: true
---

---
src: ./pages/milestone1.md
hide: false
---

---
src: ./pages/milestone2.md
hide: false
---

---
src: ./pages/milestone3.md
hide: true
---

---
src: ./pages/milestone4.md
hide: true
---

---
src: ./pages/conclusions.md
hide: true
---

---
src: ./pages/end.md
hide: false
---