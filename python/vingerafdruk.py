#!/usr/bin/env python

import operator
import sys
import types
from Tkinter import *
import tkFileDialog
import tkMessageBox

import ngram


class GenerateFrame(Frame):
	def __init__(self, master = None):
		Frame.__init__(self, master)
		Pack.config(self)
		self.createWidgets()

	def createWidgets(self):
		self.textFrame = Frame(self)
		self.textFrame.pack(fill = BOTH)
		Label(self.textFrame, text = "Tekst").pack()
		self.textScroll = Scrollbar(self.textFrame)
		self.textScroll.pack(side = RIGHT, fill = Y)
		self.text = Text(self.textFrame, yscrollcommand = self.textScroll.set)
		self.text.config(wrap = WORD)
		self.text.pack(side = LEFT, fill = BOTH, expand = 1)
		self.textScroll['command'] = self.text.yview
		self.generateButton = Button(self, text = 'Vingerafdruk opslaan', command = self.generateModel)
		self.generateButton.pack()
	
	def generateModel(self):
		modelFilename = tkFileDialog.asksaveasfilename(
			parent = self,
			title = "Opslaan taalmodel"
		)

		if len(modelFilename) == 0:
			return

		text = self.text.get('1.0', END)
		try:
			text = text.encode('utf-8')
		except:
			pass

		g = GenerateFromText(text)
		try:
			g.save(modelFilename)
		except:
			tkMessageBox.showerror(title = "Fout bij opslaan",
				message = "Bestand kon niet opgeslagen worden!")

class Generate:
	def __init__(self, textFilename):
		self.ngrams = ngram._NGram()

		textFile = open(textFilename, 'r')
		for line in textFile:
			self.ngrams.addText(line)
		textFile.close()

	def save(self, modelFilename):
		print "Saving..."
		modelFile = open(modelFilename, 'w')
		for v, k in self.ngrams.sorted():
			modelFile.write("%s\t %d\n" % (k, v))
		modelFile.close()

class GenerateFromText(Generate):
	def __init__(self, text):
		self.ngrams = ngram._NGram()
		self.ngrams.addText(text)

if __name__ == '__main__':
	if len(sys.argv) == 1:
		root = Tk()
		frame = GenerateFrame()
		root.title('Genereren taalmodel')
		frame.mainloop()
		sys.exit(0)
	elif len(sys.argv) < 3:
		print """Insufficient arguments!

Syntax: %s textfile modelfile""" % sys.argv[0]
		sys.exit(1)

	gen = Generate(sys.argv[1])
	gen.save(sys.argv[2])
