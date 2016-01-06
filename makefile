
index.html: removeAllMultiple.href removeAllPO.href removeExtraCopies.href
	cat $^ > $@

debug.html: bookmarklet_*.js makefile
	printf '<html><head><script src="library.js"></script><script>' > $@
	for b in bookmarklet_*.js; do printf "function $${b%.js} () {\n"; cat $$b; printf '}\n'; done >> $@
	printf '</script></head><body>' >> $@
	for b in bookmarklet_*.js; do printf "<a onclick='$${b%.js}()'>$${b%.js}</a>"; done >> $@
	printf '</body></html>' >> $@

%.encoded:% makefile
	sed -e 's!//\(.*\)$$!/*\1*/!g; s/"/%22/g' < $< > $@

%.href:library.js.encoded bookmarklet_%.js.encoded
	printf '<p><a href="javascript:%s;void(0);">%s</a></p>' "$$(cat $^)" "$*" > $@

clean:
	-rm *.href *.encoded index.html
