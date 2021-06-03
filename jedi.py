import jedi

source = '''
import json
json.
'''

script = jedi.Script(source,path="example.py")
print(script)

completions = script.complete(3, len('json.'))
print(completions)
for i in completions:
    print(i.complete)
