import os.path

dosierindiko = 'eoth-vortaro.js'

modifinita_tempo = os.path.getmtime(dosierindiko)

from datetime import datetime
modifinita_tempo = datetime.fromtimestamp(modifinita_tempo).strftime('%d-%m-%Y %H:%M:%S')

print(f" let lastaTempo = \"{modifinita_tempo}\";")

# preni al terminalo python lasta_sxangxo.py > lasta_sxangxo.js
