import os.path

dosierindiko = 'th-vortaro.js'

modifinita_tempo = os.path.getmtime(dosierindiko)

from datetime import datetime
modifinita_tempo = datetime.fromtimestamp(modifinita_tempo).strftime('%Y-%m-%d %H:%M:%S')

print(f" let modifinitaTempo = \"{modifinita_tempo}\"; \n document.getElementById(\"tempo\").innerHTML = modifinitaTempo;")
