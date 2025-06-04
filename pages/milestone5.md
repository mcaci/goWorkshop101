---
transition: fade-out
layout: lblue-fact
---

Let's Go: Milestone 5

---
transition: fade-out
---

# Milestone 5

Introducing concurrency

Objective: Update the code from milestone 3 to make it work concurrently

Bonus: Write documentation examples, benchmark and fuzz tests

<v-click>

For this milestone we will:
- Introduce __goroutines__ and __channels__ in Go
- Introduce __documentation examples__, __fuzz tests__ and __benchmarks__ in Go
</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Variables

How Go declares and assigns them

::left::
<v-clicks>

There are two ways to declare variables:

- short initialization `:=` operator
- `var` keyword
    -  ⚠️ __type always goes after the name__

You can do multiple assignments:
- With hardcoded values
- Accepting the return value(s) of a function call

Any unused variables are considered compiler errors, use the _blank identifier_ `_` to ignore them

</v-clicks>

::right::

```go{all|1-5|1-5|7-8|10|all}{at:2}
a := 1

var hello string
var hello string = "hello, world!"
var hello = "hello, world!"

a, b, c := "hello", 1, "world"
f, err := os.Create("myFile") // returns a file pointer and an error

f, _ := os.Create("myFile") // the second value is not assigned
```

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
</v-click>

<v-click>

For the `switch` statements:
- __Can switch on values of any type__
- `case` values are of the same type of the value on `switch`
- The `break` keyword is implied
</v-click>

<v-click>

⚠️ __`switch` statements are preferred to `if/else`__
</v-click>

::right::

```go{all|1-4|6-20|13-20|all}{at:1}
var i int
if i > 0 {
	fmt.Println(i)
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
default:
    fmt.Println(i)
}

```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 1

Writing text to a file: use pkg.go.dev to read the content of the packages

::left::

In your `main` function:

1. Create a file, using the `os` package
2. If there are any errors during the file creation
   - log them and exit with the `log` package
3. Write the "hello, world!" string to the file 
    - use the `fmt` package
4. Close the file

Bonus steps:

- Take the text to write as input of the application
  - use the `flag` package
- Test the `defer` keyword when closing the file


::right::

<v-click>
````md magic-move {lines: true}
```go{all|10|11-13|14|15|all}
package main

import (
	"bytes"
	"fmt"
	"log"
	"os"

	"github.com/mcaci/goWorkshop101code/parse"
)

func main() {
	input, err := os.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}
	lines := bytes.Split(input, []byte{'\n'})
	inChan := make(chan string)
	for _, line := range lines {
		go func(line string) {
			inChan <- string(line)
		}(string(line))
		fmt.Println(<-parse.ConcParse(inChan))
	}
}
```

```go{all|9,17|14-16|all}
package parse

func ConcParse(input <-chan string) chan string {
	out := make(chan string)
	go func() {
		select {
		case v := <-input:
			out <- Parse(v)
		}
	}()
	return out
}
```

```go{all|9,17|14-16|all}
package parse

import (
	"strings"
	"testing"
)

func TestConcParseBool(t *testing.T) {
	input := "true"
	c := make(chan string)
	go func() { c <- input }()
	output := ConcParse(c)
	result := <-output
	if !strings.HasPrefix(result, "bool") {
		t.Errorf("ConcParse(%q) = %q; Should start with %q", input, result, "bool")
	}
}
```

```go{all|9,17|14-16|all}
package parse

import (
	"fmt"
)

func ExampleParse() {
	inputs := []string{"true", "12", "12.3", "12ab"}
	for _, input := range inputs {
		result := Parse(input)
		fmt.Printf("%s, ", result) // Output: bool: true, int: 12, float: 12.3, string: 12ab,
	}
}
```
````
</v-click>