

---
transition: fade-out
---

# Milestone 2

Drawing a rectangle

Objective: We are going to draw a rectangle of any size and color and write the text on it

Bonus: By using the `flag` package we can customize anything we want

<v-click>

For this milestone we will:
- Introduce __types__ and __loops__ in Go
- Create new __functions__ and __packages__
- Introduce the concept of __exported/unexported__
- Add the dependency to an external Go __module__

</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Types in Go

primitive, internal, custom

::left::

<v-clicks depth=2>

- __primitive__ types
  - `string`: immutable sequence of characters
  - numeric types
  - `bool`
- __internal__ types: array, slice, function, interface, map, pointer and channel
- __custom__ types
  - created with `type` and/or `struct` keywords
  - functions can be attached to them
    - these kind of functions are called __methods__
    - the type between `()` is called __receiver__
  - instantiate by specifying the needed fields

</v-clicks>

::right::

```go{none|1|2-3|4|6-8|9-15|9-15|16-18|19|all}{at:2}
string
[u|]int[|8|16|32|64], float[32|64], complex[64|128]
byte, rune // aliases for uint8 and int
bool

[5]int, []int, func(int) int, fmt.Stringer
map[string]bool, *int, chan int

type MyAge int // type aliasing
a := MyAge(18)

type Person struct { // complex struct
	Name string
	Age MyAge
}
func (p Person) String() string { // method
	return fmt.Sprint(p.Name, “-”, p.age)
}
p := Person{Name: “Al”, MyAge: a}
```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 2

Drawing a rectangle and writing the text to it: use pkg.go.dev to read the content of the packages

::left::

1. Create a function that draws a rectangle (`image` and `image/color`)
    - `New(l, h int, c color.RGBA) *image.Paletted`
    - Use `palette.Plan9` when creating a new `image.Paletted` object (`image/color/palette`)
2. Store the rectangle in a PNG file (`image/png`)
3. Create a function that writes the text over the image
    - import `github.com/golang/freetype`
    - run `go mod tidy` to update the dependency
    - you'll need a [ttf](https://github.com/mcaci/lets-go-workshop/blob/main/resources/fonts/Ubuntu-R.ttf) file

<v-click>

Bonus: Move the new function into a new package
</v-click>


::right::

<v-click>
````md magic-move {lines: true}
```go{all|7,13|10|8,14-15}
func main() {
	f, err := os.Create("./out/rectangle.png")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	r := New(800, 600, color.RGBA{R:0, G:0, B:255, A:255})
	Write(r, "Hello World!", color.RGBA{A:255},
    "./resources/fonts/Ubuntu-R.ttf", 32)
	png.Encode(f, r)
}

func New(l, h int, c color.RGBA) *image.Paletted { ... }
func Write(dst draw.Image, text string, c color.RGBA, 
  fontPath string, fontSize float64) error { ... }
```

```go{all|2|3|4-9}
func New(l, h int, c color.RGBA) *image.Paletted {
	r := image.Rect(0, 0, l, h)
	img := image.NewPaletted(r, palette.Plan9)
	for i := 0; i < l; i++ {
		for j := 0; j < h; j++ {
      // filling the image pixel by pixel
			img.Set(i, j, c)
		}
	}
	return img
}
```

```go{all|3|4-17|18}
func Write(dst draw.Image, text string, 
  c color.RGBA, fontPath string, fontSize float64) error {
    ctx := freetype.NewContext()
    fontBytes, err := os.ReadFile(fontPath)
    if err != nil { 
      return err 
      }
    f, err := freetype.ParseFont(fontBytes)
    if err != nil { 
      return err 
      }
    ctx.SetClip(dst.Bounds())
    ctx.SetDPI(72)
    ctx.SetDst(dst)
    ctx.SetFont(f)
    ctx.SetFontSize(fontSize)
    ctx.SetSrc(image.NewUniform(c))
    _, err = ctx.DrawString(text, freetype.Pt(10, 30))
    return err
}
```

```go
// BONUS: myimage/myimage.go
package myimage

func New(l, h int, c color.RGBA) *image.Paletted { ... }
func Write(dst draw.Image, text string, c color.RGBA, 
  fontPath string, fontSize float64) error { ... }
```

```go{all|5,19,20|9-12,18,20|all}
// BONUS: main.go
package main
import (
  ...
	"github.com/mcaci/lets-go-workshop/myimage"  
)

func main() {
	backR := flag.Uint("backR", 0, "Red value for the background color")
	backG := flag.Uint("backG", 0, "Green value for the background color")
	backB := flag.Uint("backB", 0, "Blue value for the background color")
	flag.Parse() // parse flags after defining all of them
	f, err := os.Create("./out/rectangle.png")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
  c := color.RGBA{R: uint8(*backR), G: uint8(*backG), B: uint8(*backB), A: 255}
	r := myimage.New(800, 600, c)
	myimage.Write(r, strings.Join(flag.Args(), " "), color.RGBA{A: 255}, "./resources/fonts/Ubuntu-R.ttf", 32)
	png.Encode(f, r)
}
```

```go
func main() {
	f, err := os.Create("./out/rectangle.png")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	r := New(800, 600, color.RGBA{R:0, G:0, B:255, A:255})
	Write(r, "Hello World!", color.RGBA{A:255},
    "./resources/fonts/Ubuntu-R.ttf", 32)
	png.Encode(f, r)
}

func New(l, h int, c color.RGBA) *image.Paletted { ... }
func Write(dst draw.Image, text string, c color.RGBA, 
  fontPath string, fontSize float64) error { ... }
```
````
</v-click>

---
transition: fade-out
---

# Milestone 3

Animating our first GIF

Objective: We are going to create an additional frame and compose it with the previous one to create the GIF

<v-click>

For this milestone we will:
- Use __arrays__ and __slices__
- Introduce how __interfaces__ are used in Go

</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Arrays and slices

Go's main collection types (with map)

::left::

<v-click>

__Arrays__ are __fixed__ in size, __slices__ are __variable__
- slices are more common unless performance is really sensitive
</v-click>

<v-click>

To initialize slices we can use the `make` builtin function
- `make` can also initialize maps and channels
</v-click>

<v-click>

To add elements to a slice we can use the `append` builtin function
</v-click>

<v-click>

Arrays and slices can be accessed by index
</v-click>

<v-click>

Arrays and slices can be subsliced: a subslice is a subset of the original array/slice
</v-click>

::right::

```go{all|1-2|4|5|6|8-11}{at:1}
var nArray [2]int // array of int with length 2
var nSlice []int  // slice of int with length 0

nSlice = make([]int, 2) // {0, 0}
nSlice = append(nSlice, 4) // {0,0,4}
nSlice[1] = 2 // {0, 2, 4}

moreNumbers := [4]int{0, 1, 2, 3}
moreNumbers[1:3] // {1,2}
moreNumbers[1:]  // {1,2,3}
moreNumbers[:2]  // {0,1}
```

---
transition: fade-out
---

# Interfaces

Two rules about Go interfaces

<v-click>

1. Interfaces in Go are __set of methods__
2. Interfaces in Go are implemented __when a concrete type implements its methods__
    - No explicit keywords like “implements”
</v-click>

<v-click>

```go
// Namer is an interface that lists one method
// Name() string
type Namer interface { 
  Name() string 
}

// Person implements Namer interface
type Person struct { Name string }
func (p Person) Name() string { return p.Name }

// Building does NOT implement Namer interface
type Building struct { Name string }
func (b Building) name() string { return p.Name }
```
</v-click>

---
transition: fade-out
---

# How Go interfaces are used

Go doesn't design with interfaces it discovers them

<v-click>
````md magic-move {lines: true}
```go{all|1-4|7-11|14-21|all|4,9,11}
package person // from module someOtherPersonModule

type Person struct { Name string }
func (p Person) Name() string { return p.Name }

----------------------
package greeter // from module myApp

import "someOtherPersonModule/person"

func Greet(p person.Person) { fmt.Printf("Hi %s\n", p.Name()) }

----------------------
package main // from module myApp

import "someOtherPersonModule/person"
import "myApp/greeter"

func main() {
  greeter.Greet(person.Person{Name: "Michele"})
}
```

```go{4,9,11|all}
package person // from module someOtherPersonModule

type Person struct { Name string }
func (p Person) Name() string { return p.Name }

----------------------
package greeter // from module myApp

type Namer interface { Name() string }

func Greet(n Namer) { fmt.Printf("Hi %s\n", n.Name()) }

----------------------
package main // from module myApp

import "someOtherPersonModule/person"
import "myApp/greeter"

func main() {
  greeter.Greet(person.Person{...})
}
```

```go{3,5,10,14}
package greeter // from module myApp

type Namer interface { Name() string }

func Greet(n Namer) { fmt.Printf("Hi %s\n", n.Name()) }

----------------------
package main // from module myApp

import "someOtherPersonModule/person"
import "myApp/greeter"

func main() {
  greeter.Greet(person.Person{Name: "Michele"})
}
```
````
</v-click>

<v-click>

We can replace "someOtherPersonModule/person.Person" type with anything we want as long as it implements __our own__ `Namer` interface
</v-click>


---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 3

Create a GIF with two frames: use pkg.go.dev to read the content of the packages

::left::

1. Create a function that creates two frames for the GIF
    - `New(/*the params you need*/) ([]*image.Paletted, error)`
2. Create a function that stores the two frames into a GIF and saves it
    - Use the `image/gif` package

You can reuse the code in the previous milestones to create the frames

::right::

<v-click>
````md magic-move {lines: true}
```go{all|9,16|all}
package main

func main() {
	f, err := os.Create("./out/myfirstgif.gif")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	c1 := color.RGBA{R:0, G:0, B:0, A: 255}
	c2 := color.RGBA{R:255, G:255, B:255, A: 255}
	frames, err := mygif.New(text, c1, c2,
    ./resources/fonts/Ubuntu-R.ttf, 32)
	if err != nil {
		log.Fatal(err)
	}
	mygif.Save(f, frames, 100)
}
-----------------------
package mygif
func New(text string, c1, c2 color.RGBA,
  fontPath string, fontSize float64) ([]*image.Paletted, error) { ... }
func Save(w io.Writer, frames []*image.Paletted, delay int) error { ... }
```

```go{all|4,20|6-12|13-14|18}
func New(text string, c1, c2 color.RGBA, fontPath string, fontSize float64) ([]*image.Paletted, error) {
	const nFrames = 2
	l, h := myimage.TextBounds(int(fontSize), len(text), 10)
	var frames []*image.Paletted
	for i := 0; i < nFrames; i++ {
		var bgColor, fgColor color.RGBA
		switch i % 2 {
		case 0:
			bgColor, fgColor = c1, c2 // same as params
		default:
			bgColor, fgColor = c2, c1 // switch
		}
		frame := myimage.New(l, h, bgColor)
		err := myimage.Write(frame, text, fgColor, fontPath, fontSize)
		if err != nil {
			return nil, err
		}
		frames = append(frames, frame)
	}
	return frames, nil
}
```

```go{all|2-4|6-9|all}
func Save(w io.Writer, frames []*image.Paletted, delay int) error {
	delays := make([]int, len(frames))
	for i := range delays {
		delays[i] = delay
	}
	return gif.EncodeAll(w, &gif.GIF{
		Image: frames,
		Delay: delays,
	})
}
```
````
</v-click>

<v-click>

<img src="/images/myfirstgif.gif" class="absolute bottom-10 right-10 text-right" style="width: 30%; height: auto;"/>
</v-click>
---
transition: fade-out
---

# Milestone 4

All about concurrency 

Objective: We are going to create a set of GIFs, first sequentially and then concurrently

<v-click>

For this milestone we will introduce various elements of Go's concurrency framework:
- `go` keyword and goroutines
- Channels
- WaitGroups
</v-click>

---
transition: fade-out
---

# Goroutines and channels

Basic elements of the Go concurrency framework

<v-clicks>

## Goroutines

Units of concurrent execution in Go

They are created with the `go` keyword

```go
// Both spawn a goroutine that prints “hello”
go fmt.Println(“Hello”)
go func() { fmt.Println(“hello”) }() // here we create and call an anonymous function
```

## Channels

Internal type that can be used to:
- Send and receive data from goroutines
- Synchronize goroutines

</v-clicks>

---
transition: fade-out
---

## Channels continued

Share by communicating

<v-clicks>

Channels must be initialized before usage with the `make` builtin function

Channels communicate via the arrow operator `<-`; the meaning of the arrow depends on the position with respect to the channel

```go
a := make(chan int)    // unbuffered channel (size=0)
b := make(chan int, 3) // buffered channel (size>0)
go func() { a <- 4 }()
go func() { b <- 5 }()
fmt.Println(<-a * <-b)
```
</v-clicks>

<v-clicks>

- When `<-` is on the right of the channel, it means send to the channel. The correspondent goroutine is called __sender__
- When `<-` is on the left of the channel, it means receive from the channel. The correspondent goroutine is called __receiver__
- __Unbuffered channel__: the sender is blocked until a receiver is available
- __Buffered channel__: the sender is not blocked before the buffer is full and then it waits for an available receiver

</v-clicks>

---
transition: fade-out
---

# Looping on channels

Another usage of for-range

<v-clicks>

`for v := range c {}`

Only one element is returned in the range `v := <-c`
- for slices, arrays, maps and strings it was two elements (position and element)

The for-range on a channel stops only after the channel is closed with the builtin function `close()` which signals that no more values will be sent to the channel

```go
n := make(chan int)
go func() { 
  for i := 0; i < 5; i++ { 
    n <- i
  }
  close(n)
}()
for v := range n { 
  fmt.Println(v) 
}
```
</v-clicks>

---
transition: fade-out
layout: two-cols-header
---

# WaitGroups

Synchronization structure of the standard library

::left::

<v-clicks>

WaitGroup is a custom type of the `sync` package

It makes sure that a group of goroutine ends once they are done

It defines 3 methods
- Add(int)
  - to add a number of goroutines to wait for
- Wait()
  - to make a goroutine wait for the others to be done
- Done()
  - to signal that waiting goroutine should not wait on the caller anymore

</v-clicks>

::right::

```go
var wg sync.WaitGroup
for i := 0; i < 5; i++ { 
  go func() {  
    wg.Add(1)
    fmt.Println(i)
    wg.Done()
  }()
}
wg.Wait()

```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 4

Drawing a rectangle and writing the text to it: use pkg.go.dev to read the content of the packages

::left::

Steps:

1. Read an input file with a list of words/sentences in separate lines
    - use `bufio.Scanner`
2. For each line call the code to create the gif from the previous milestone
    - sequentially at first
    - concurrently after


::right::

<v-click>
````md magic-move {lines: true}
```go{all|4,7,12-13,22|all}
// SEQUENTIAL
func main() {
	// ...
	for text := range readInput("./list.txt") {
		text := text
		log.Printf("start %q", text)
    f, err := os.Create(fmt.Sprintf("./out/%s.gif", text))
    if err != nil {
      log.Fatal(err)
    }
    defer f.Close()
    gif, err := mygif.New(text, color.RGBA{...},
       color.RGBA{...}, *textFont, *textFontSize)
    if err != nil {
      log.Fatal(err)
    }
    err = gif.Save(f)
    if err != nil {
      log.Fatal(err)
    }
    log.Printf("done %q", text)
	}
}
```

```go{all|2,5|all}
func readInput(r io.Reader) []string {
	var texts []string
	s := bufio.NewScanner(r)
  for s.Scan() {
    texts = append(texts, s.Text())
  }
	return texts
}
```

```go{all|4,7,8,19,20,22|all}
// CONCURRENT
func main() {
	// ...
	var wg sync.WaitGroup
	for text := range readInput("./list.txt") {
		text := text
		wg.Add(1)
		go func() {
      log.Printf("start %q", text)
      f, err := os.Create(fmt.Sprintf("./out/%s.gif", text))
      if err != nil { log.Fatal(err) }
      defer f.Close()
      gif, err := mygif.New(text, color.RGBA{...},
         color.RGBA{...}, *textFont, *textFontSize)
      if err != nil { log.Fatal(err) }
      err = gif.Save(f)
      if err != nil { log.Fatal(err) }
      log.Printf("done %q", text)
			wg.Done()
		}()
	}
	wg.Wait()
}
```

```go{all|2,12|3,13|4-7,14-20|all}
// SEQUENTIAL
func readInput(r io.Reader) []string {
	var texts []string
	s := bufio.NewScanner(r)
  for s.Scan() {
    texts = append(texts, s.Text())
  }
	return texts
}

// CONCURRENT
func readInput(r io.Reader) chan string {
	texts := make(chan string)
	go func() {
		s := bufio.NewScanner(r)
		for s.Scan() {
			texts <- s.Text()
		}
		close(texts)
	}()
	return texts
}
```

```go
// CONCURRENT
func main() {
	// ...
	var wg sync.WaitGroup
	for text := range readInput("./list.txt") {
		text := text
		wg.Add(1)
		go func() {
      log.Printf("start %q", text)
      f, err := os.Create(fmt.Sprintf("./out/%s.gif", text))
      if err != nil { log.Fatal(err) }
      defer f.Close()
      gif, err := mygif.New(text, color.RGBA{...},
         color.RGBA{...}, *textFont, *textFontSize)
      if err != nil { log.Fatal(err) }
      err = gif.Save(f)
      if err != nil { log.Fatal(err) }
      log.Printf("done %q", text)
			wg.Done()
		}()
	}
	wg.Wait()
}
```
````
</v-click>
