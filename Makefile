.PHONY: emulator-setup emulator-start emulator-export

emulator-setup:
	mkdir -p "data"

emulator-start: emulator-setup
	open http://localhost:9090
	firebase emulators:start --import=data --export-on-exit

emulator-export: emulator-setup
	firebase emulators:export -f ../data