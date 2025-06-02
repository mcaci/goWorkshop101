---
transition: fade-out
layout: lblue-fact
---

Let's Go: Milestone 2

---
transition: fade-out
---

# Milestone 2

Listing items from an input text file

## Objective

Update the code from milestone 1 to from a text file

## Bonus

Test the type of data read from the input

<v-click>

## In this milestone

- We will introduce __types__, __zero values__, __pointers__ and __loops__
</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Types in Go

</br>

::left::

<v-clicks depth=2>

- __primitive__ types
  - `string`: immutable sequence of characters
  - numeric types
  - `bool`
- __internal__ types
- __custom__ types
  - _type aliasing_ used to rename any type
  - _complex type_ used to group fields
-  __methods__ are functions attached to custom types
    - the type between `()` is called __receiver__
    - custom types and methods are the closest structure to _classes_ in other languages
</v-clicks>

::right::

```go{none|1|2-3|4|all}{at:2}
string
[u|]int[|8|16|32|64], float[32|64], complex[64|128]
byte, rune // aliases for uint8 and int
bool
```

<br/>

```go{none|1|3-6|3-10|all}{at:7}
type MyAge int // type aliasing

type Person struct { // complex type
	Name string
	Age MyAge
}

func (p Person) String() string { // method
	return fmt.Sprint(p.Name, “-”, p.age)
}
```

<arrow v-click="[10, 11]" x1="700" y1="350" x2="590" y2="390" color="#953" width="2" arrowSize="1" />

---
transition: fade-out
layout: two-cols-header
---

# Zero values

</br>

::left::

_Variables in Go are always assigned to a value_

<v-clicks depth=2>

- If not explicitly assigned, a default value is assigned
- This default value is called the __zero value__
- The zero value depends on the type
  - `""` (empty string) for strings
  - `0` for numeric types
  - `false` for booleans
  - type aliases are assigned the zero value of its underlying type
  - complex types are assigned the zero value of each field

</v-clicks>

::right::

```go{all|1|2-3|4|6|8-11}{at:4}
string = ""
[u|]int[|8|16|32|64], float[32|64], complex[64|128] = 0
byte, rune = 0
bool = false

type MyAge int = 0 // because it is an int

type Person struct {
	Name string
	Age MyAge
} = Person{Name: “”, MyAge: 0}
```

---
transition: fade-out
layout: two-cols-header
---

# Pointers

</br>

::left::

<v-clicks>

_Basic operations_

Use `*` to declare a pointer and to dereference it

Use `&` to take the address of a variable

`&` can also be used to take the address of a complex struct value

_In addition_

Method can have __pointer__ or __value__ receivers

- With pointer receiver: the content of the receiver can be modified
- With value receiver: modification to the content of the receiver are lost at the end of the method

</v-clicks>

::right::

```go{none|1,3|4|2|all}{at:2}
var p *Person
p = = &{Name: “Al”}
al := *p
p = &al
```

<br/>

```go{none|all}{at:6}
type Person struct {
	Name string
	Age MyAge
}

func (p *Person) SetName(name string) {
  p.Name = name
}

func (p Person) GetName() string { 
  return p.Name
}
```

---
transition: fade-out
layout: two-cols-header
---

# Loops

<br/>

::left::

_Only_ the `for` _kewyord exist for loops_

<v-clicks>

- Parenteshis `()` are not required after `for`
- Brackets `{}` are always required around the body

_While is written as_ `for condition`

Use `for...range` syntax to count up to $n-1$
- But not only...

_All loops can be interrupted with the_ `break` _keyword_

</v-clicks>

<arrow v-click="5" x1="460" y1="450" x2="500" y2="440" color="#953" width="2" arrowSize="1" />

::right::

```go{none|1-2|4-10|12-18|all}{at:1}
// regular for loop
for i := 0; i < 10; i++ {} 

// while loop
var n int
for n < 3 { 
  n++
}

for true {} // or `for {}` are the infinite loop

// for-range syntax counting from 0 to 9
for i := range 10 { 
  if i > 1 {
    break
  }
  fmt.Println(i) // prints 0 and 1 in two lines
}

```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 2

Listing items from an input text file: use pkg.go.dev to read the content of the packages

::left::

In your `main` function:

1. Read the input file, using the `os` package
2. If there are any errors during the file read
   - log them and exit with the `log` package
3. Print each line, using the `fmt` package
4. Close the file

Bonus steps (during step 3):

- Test the type of the value from the input line with `strconv` package
- Save the line in a custom type a create a `String() string` method to return the its value as a `string`

::right::
⚠️ __type always goes after the name__

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
