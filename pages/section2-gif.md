---
transition: fade-out
layout: lblue-fact
---

Let's Go: Let's make our GIF application!

---
transition: fade-out
---

# Milestone 1

Writing text to a file

Objective: Update the hello world example to create a file and write “hello world” on it

Bonus: customize the text to write

<v-click>

For this milestone we will:
- Introduce __varibles__ and __conditionals__ in Go
- Use __functions calls__ to the standard library as seen in the "hello world" example
- As a bonus introduce the __defer__ keyword
</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Variables

How Go declares and assigns them

::left::
<v-click>

There are two ways to declare variables
</v-click>

<v-clicks>

- short initialization `:=` operator
- `var` keyword
    - Unlike other languages, __the type always goes after the name__

</v-clicks>

<v-click>

You can do multiple assignments
</v-click>

<v-clicks>

Any unused variables are considered compiler errors, to ignore them use `_` (blank identifier)

Note: when calling a function from a different package remember to import it and keep in mind that Go is case sensitive
</v-clicks>

::right::

```go{all|1|3-5|7-8|10|all}{at:2}
a := 1

var hello string
var hello string = "hello, world!"
var hello = "hello, world!"

a, b, c := "hello", 1, "world"
f, err := os.Create("myFile") // returns a file pointer and an error

f, _ := os.Create("myFile") // the second value is not assigned
```

<div class="text-white">_</div>

<v-click>

```go
package main

import "os"

func main() { 
  os.Create("myFile") // os.Create is different from os.create
}
```
</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Conditionals

Similar as in other languages but

::left::

<v-click>

For the `if` statements:
- Parenteshis `()` are not required inside conditions
- Brackets `{}` are always required around the body
- There aren't ternary operators
</v-click>

<v-click>

For the `switch` statements:
- Can switch on any kind of values rather than `int`
- Case statements can be other than constants
- The `break` keyword is implied
</v-click>

<v-click>

__Despite `else` keyword being present, the `switch` statements are preferred to `if/else` ones__
</v-click>

::right::

```go{all|3-5|7-19|all}{at:1}
var i int
_, err := fmt.Scan(&i)
if err != nil {
	log.Fatal(err)
}

switch i {
  case 0:
    log.Print("zero")
  default: // good practise to always add it
    log.Print(i)
}

switch { // == switch true
case i+2 == 10-i:
	fmt.Printf(“i+2 == 10-i holds for %d\n”, i)
case float64(i)/10.0 > math.Sqrt(float64(i)):
	fmt.Printf(“i/10.0 > sqrt(i) holds for %d\n”, i)
}

```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 1

Writing text to a file: use pkg.go.dev to read the content of the packages

::left::

1. Create a file 
    - use the `os` package
2. If there are any errors during the file creation
   - log them and exit with the `log` package
3. Write the "hello, world!" string to the file 
    - use the `fmt` package
4. Close the file
5. Run `go run main.go` in the terminal

<v-click>

Bonus steps:

- Take the text to write as input of the application
  - use the `flag` package
- Use the `defer` keyword when closing the file
</v-click>


::right::

<v-click>
````md magic-move {lines: true}
```go{all|10|11-13|14|15|all}
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	f, err := os.Create("./out/text")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintln(f, "Hello World!")
	f.Close()
}
```

```go{all|9,17|14-16|all}
import (
	"flag"
	"fmt"
	"log"
	"os"
)

func main() {
	flag.Parse()
	f, err := os.Create("./out/text")
	if err != nil {
		log.Fatal(err)
	}
  // defer keyword delegates the execution of the 
  // function call at the end of the function
	defer f.Close()
	fmt.Fprintln(f, flag.Args())
}
```
````
</v-click>

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

# Types continued

Zero values, pointers and functions

::left::

<v-clicks>

## Zero values
All variables in Go are assigned to a value; if not explicitly assigned Go assigns a default value for the type, the __zero value__

## Pointers
They work as in C/C++: use `*` to declare a pointer and to dereference and `&` to take the address of a variable

## Functions
`func` keyword to declare them, but mostly similar to other languages
</v-clicks>

::right::

```go{none|1-13|1-13|15-17|15-17|19-22|19-22}{at:1}
string = ""
[u|]int[|8|16|32|64], float[32|64], complex[64|128] = 0
byte, rune = 0
bool = false

[5]int, []int, func(int) int, fmt.Stringer = nil
map[string]bool, *int, chan int = nil

type MyAge int = 0 // because it is an int
type Person struct {
	Name string
	Age MyAge
} = Person{Name: “”, MyAge: 0}

var p *Person = &{Name: “Al”}
al := *p
p = &al

// multiple return values
func parseColor(hex string) (color.RGBA, error) {...}
// type is omitted for parameters that share the same type
func sum(a, b int) int {...}
```

---
transition: fade-out
layout: two-cols-header
---

# Loops

For in all its forms

::left::

<v-clicks>

Similar as other languages but without `()` and mandatory `{}`

Only `for` kewyord exist for loops

Can be interrupted with the `break` keyword

Meaning of the two variables in the `for-range` syntax
<table>
  <tr>
    <th>type</th>
    <th>i</th>
    <th>v</th>
  </tr>
  <tr>
    <td>string</td>
    <td>index</td>
    <td>character at position i</td>
  </tr>
  <tr>
    <td>array/slice</td>
    <td>index</td>
    <td>element at position i</td>
  </tr>
  <tr>
    <td>map</td>
    <td>key</td>
    <td>value</td>
  </tr>
</table>

</v-clicks>

::right::

```go{none|all|all|18-20|14-22|17|all}{at:1}
// regular for loop
for i := 0; i < 10; i++ {} 

// while loop
var n []int
// len is a builtin function, it computes the length of
// strings, arrays, slices, maps and channels
for len(n) < 3 { 
  n = append(n, 1)
}

for true {} // infinite loop

// for-range syntax
// iterates on all items of
// strings, arrays, slices, maps and channels
for i, v := range n { 
  if i > 1 {
    break
  }
  fmt.Println(i, v) // 0 1\n1 1\n
}

```

---
transition: fade-out
---

# Packages

The smallest unit of Go code that can be distributed

<v-clicks>

A __package__ is a __set of symbols__ (functions, types, variables) that can be distributed to other packages to be used; in practice, it is a folder containing Go files

All Go files in the same package must have the same package declaration at the beginning of the file

```go
package myImage
```

Importing a package differs if it comes from the standard library (`package_path`) or from a third-party `"module_path/package_path"`)

```go
import (
  "fmt" // from standard library
  “github.com/mcaci/lets-go-workshop/myimage” // from third-party
  // github.com/mcaci/lets-go-workshop is the module_path (which can be taken in go.mod file)
  // myimage is the package_path
)
```

When importing third-party packages, run `go mod tidy` at the root of the project to download the Go modules that contain them
</v-clicks>

---
transition: fade-out
---

# Scopes

Go is case sensitive

<v-clicks>

To reference a symbol with __public__ scope have it start with an __Uppercase__ letter

Symbols that have a public scope are said to be __exported__

Otherwise, they start with a __Lowercase__ letter and are __unexported__, which means that they are __accessible only to the package__ where they are located

```go
package myPackage

// Exported/public symbols
type Age int
func Sum(a, b int) int { return a + b }
const BaseAge = Age(0)
var ErrAgeNotFound error // global variable: bad practice

// Unexported symbols: available only to myPackage packaged
func sum(a, b int) int { return a + b }
var errAgeNotFound error // package-level variable: to avoid as well

// Mix of exported and unexported: Person type and its Name field are exported, but its age field is not
type Person struct { a Age; Name string }
```
</v-clicks>

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
