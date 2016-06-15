# Makefile directory
pwd := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))

# Index lookup function
_pos = $(if $(findstring $1,$2),$(call _pos,$1,\
       $(wordlist 2,$(words $2),$2),x $3),$3)
pos = $(words $(call _pos,$1,$2))
lookup = $(word $(call pos,$1,$2),$3)

# Android
# Resource path - update to match project
android_res := ../android/app/src/main/res/

android_densities := xxxhdpi xxhdpi xhdpi hdpi mdpi ldpi
android_percentages := 100% 75% 50% 37.5% 25% 18.75%
android_icons := $(addprefix $(android_res), \
	         $(addsuffix /ic_launcher.png, \
                 $(addprefix mipmap-,$(android_densities))))
android_bg_fb_login := $(addprefix $(android_res), \
                       $(addsuffix /bg_fb_login.png, \
                       $(addprefix mipmap-,$(android_densities))))

# iOS
# Assets path - update to match project
ios_assets := ../ios/PlusOne/Images.xcassets/
ios_iconset := AppIcon.appiconset/
ios_brandset := Brand Assets.launchimage/
ios_icon_filenames := Icon-Small@2x.png Icon-Small@3x.png \
                      Icon-Small-40@2x.png Icon-Small-40@3x.png \
                      Icon-60@2x.png Icon-60@3x.png
# 29x2, 29x3, 40x2, 40x3, 60x2, 60x3 for icons
ios_percentages := 30.2083333333% 45.3125% 41.6666666667% 62.5% 62.5% 93.75%
ios_bg_scales := 320x480 640x960 640x1136
ios_icons := $(addprefix $(ios_assets), \
             $(addprefix $(ios_iconset),$(ios_icon_filenames)))

# Goals
.PHONY: all initial icons

all: initial icons background

initial:
	@echo "Generating image resources..."

app_icon.png: app_icon.svg
	inkscape -z -e "$(pwd)/app_icon.png" -d 640 -C "$(pwd)/app_icon.svg"

$(android_icons): app_icon.png
	convert $< -resize $(call lookup,$@,$(android_icons),$(android_percentages)) $@

$(ios_icons): app_icon.png
	convert $< -resize $(call lookup,$@,$(ios_icons),$(ios_percentages)) $@

icons: $(android_icons) $(ios_icons)

# Background
bg_fb_login.png: bg_fb_login.xcf
	convert $< $@

$(android_bg_fb_login): bg_fb_login.png
	convert $< -resize $(call lookup,$@,$(android_bg_fb_login),$(android_percentages)) $@

$(ios_bg_scales): bg_fb_login.png
	convert $< -resize $@^ -crop $@+0+0 "$(ios_assets)$(ios_brandset)$@_$<"

background: $(android_bg_fb_login) $(ios_bg_scales)
