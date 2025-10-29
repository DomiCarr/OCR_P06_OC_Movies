#!/bin/zsh

# Nettoyage de la sortie si elle existe
rm -f code.txt

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

echo "✅ Concaténation terminée → code.txt généré"
