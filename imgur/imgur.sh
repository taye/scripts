#!/bin/bash

function imgNotify ()
{
    imgPre="http://imgur.com/"
    delPre="http://imgur.com/delete/"
    thumbPre="http://i.imgur.com/"
    thumbPost="s.jpg"

    status=$1
    echo $status

    if [ "$status" == "ok" ]; then
        img=$2
        del=$3
        iconFile="/tmp/imgur_icon${img}.jpg"
    
        summary="Image Uploaded"
        body="
            <a href=\"$imgPre$img\">$imgPre$img</a>
            <a href=\"$delPre$del\"> Delete...</a>
        "
        wget -q $thumbPre$img$thumbPost -O "$iconFile"
        icon=$iconFile

        echo To delete: $delPre$del
        echo Image:     $imgPre$img
        
    else
        summary="Upload Failed"
        body=$2
        icon="default-error"
    fi

    notify-send "$summary" "$body" -i "$icon"
}

function imgUp ()
{
    key="486690f872c678126a2c09a9e196ce1b"
    uploadURL="http://imgur.com/api/upload.json"

    file=$(readlink -f $1)

    json=$(curl -s -F "image"=@"$file"  -F "key=$key" $uploadURL  | sed -e 's/\\//g') 

    imgNotify $(js -e "
        var response = JSON.parse('$json').rsp,
            image = response.image,
            echo;

        echo = response.stat;
        if (image) {
            echo = [
                echo,
                image.image_hash,
                image.delete_hash
            ].join(' ');
        }
        else {
            echo += ' ' + image.error_msg;
        }
        print (echo);
    ")
}

function firstNonEmpty () {
    for i in $*; do
        if [ "x$i" != "x" ]; then
            echo $i;
            return;
        fi
    done
}

function imgDel () {
    key="486690f872c678126a2c09a9e196ce1b"

    del=`firstNonEmpty $1 $del`
    curl -s  -F "key=$key" "https://imgur.com/api/delete/$del.json"
}

if [ $# == 0 ]; then
    dir="$HOME/imgur"
    mkdir -p "$dir"

    echo "Click on a window or select an area to capture"
    shot="$dir/$(date +%Y-%m-%d%s).png"

    scrot -s -b $shot -e 'echo $f' &&

    imgUp $shot

elif [ x$1 == xdel ] || [ x$1 == delete ]; then
    imgDel $2

else
    for i in $* ; do
        imgUp $i
    done
fi

