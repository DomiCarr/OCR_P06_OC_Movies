#!/bin/zsh

# Output file
output_file="code.txt"

# Nettoyage de la sortie si elle existe
rm -f code.txt

# Add generated date and time at the top
echo "Generated $(date '+%Y-%m-%d %H:%M:%S')" >> "$output_file"
echo "\n\n" >> "$output_file"

# Ajout du HTML
echo "===== index.html =====" >> code.txt
cat index.html >> code.txt
echo "\n\n" >> code.txt

# Ajout de tous les fichiers CSS du dossier style/
for f in style/*.css; do
  echo "===== ${f} =====" >> code.txt
  cat "$f" >> code.txt
  echo "\n\n" >> code.txt
done

# Find all .js files recursively, sort alphabetically, handle spaces
find . -type f -name "*.js" | sort | while IFS= read -r f; do
echo "===========================================================================================" >> "$output_file"
  echo "    $f " >> "$output_file"
echo "===========================================================================================" >> "$output_file"
  cat "$f" >> "$output_file"
  echo "\n\n" >> "$output_file"
done

echo " Concaténation terminée → code.txt généré"
