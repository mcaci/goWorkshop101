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

Update the code from milestone 1 to read input from a text file, test the type of data read and output it to a file

<v-click>

## What we will see/use

- __Array__ and __slice__
- `[]byte` and `string` and the cast operation
- __Loops__
</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Arrays and slices

<br/>

::left::

<v-click>

__Arrays__ are __fixed__ in size, __slices__ are __variable__
- slices are more common unless performance is really sensitive
- _Zero value_ for both is `nil`
</v-click>

<v-click>

To initialize slices we can use the `make` builtin function
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

_All loops can be interrupted with the_ `break` _keyword_

Use `for...range` syntax to also list elements in a slice or array
- First value is the index at eech iteration, second value is the slice/array value at that index


</v-clicks>

<arrow v-click="5" x1="460" y1="370" x2="500" y2="400" color="#953" width="2" arrowSize="1" />

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

for i, v := range sliceOrArray { ... }

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
2. Create the output file
- Use the `os` package fpr bpyh
3. Log any error and exit: `log` package
4. Split the input into lines to read
- Use the `bytes` or the `bufio` packages
5. Loop on each line
- Test if the line is a `bool`, an `int` or a `float64` with `strconv` package
- Print the type and content of the line to the output file
6. Close the appropriate files

::right::

<v-click>
````md magic-move {lines: true}
```go{all|2-3|4-5|6|7,18|8,11,14|9,12,15,17|all}
func main() {
	input, err := os.ReadFile("input")
	if err != nil { log.Fatal(err) }
	output, err := os.Create("output")
	if err != nil { log.Fatal(err) }
	lines := bytes.Split(input, []byte{'\n'})
	for _, line := range lines {
		if _, err := strconv.ParseBool(input); err == nil {
			fmt.Fprintln(output, "bool: " + input); continue
		}
		if _, err := strconv.Atoi(input); err == nil {
			fmt.Fprintln(output, "int: " + input); continue
		}
		if _, err := strconv.ParseFloat(input, 64); err == nil {
			fmt.Fprintln(output, "float: " + input); continue
		}
		fmt.Fprintln(output, "string: " + input)
	}
	output.Close()
}
```
````
</v-click>
