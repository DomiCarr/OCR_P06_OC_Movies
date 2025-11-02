#!/bin/zsh

# Output file
output_file="code.txt"

# Clean previous output if exists
rm -f "$output_file"

# Add generated date and time at the top
echo "Generated $(date '+%Y-%m-%d %H:%M:%S')" >> "$output_file"
echo "\n\n" >> "$output_file"

# Add index.html
echo "===========================================================================================" >> "$output_file"
echo "   index.html" >> "$output_file"
echo "===========================================================================================" >> "$output_file"
cat "index.html" >> "$output_file"
echo "\n\n" >> "$output_file"

# Find all .js files recursively, sort alphabetically, handle spaces
find . -type f -name "*.js" | sort | while IFS= read -r f; do
echo "===========================================================================================" >> "$output_file"
  echo "    $f " >> "$output_file"
echo "===========================================================================================" >> "$output_file"
  cat "$f" >> "$output_file"
  echo "\n\n" >> "$output_file"
done

echo "Concatenation complete → $output_file generated"
