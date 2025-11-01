#!/bin/zsh

# Output file
output_file="code.txt"

# Clean previous output if exists
rm -f "$output_file"

# Add index.html
echo "===== index.html =====" >> "$output_file"
cat "index.html" >> "$output_file"
echo "\n\n" >> "$output_file"

# Find all .js files recursively, sort alphabetically, handle spaces
find . -type f -name "*.js" | sort | while IFS= read -r f; do
  echo "===== $f =====" >> "$output_file"
  cat "$f" >> "$output_file"
  echo "\n\n" >> "$output_file"
done

echo "Concatenation complete → $output_file generated"
