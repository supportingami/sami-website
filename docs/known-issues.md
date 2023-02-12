## Duplicate dependencies

## Firebase hosting

Very fiddly (but not impossible)
As well as manual scripts fix discussed at link below, a lot of issues of folder management required (particularly duplicate entries mentioned below)

https://github.com/firebase/firebase-tools/issues/5369#issuecomment-1426958765

Additionally `next` must appear in the package.json folder as a listed dependency (not parent workspace)

Potential workaround is to try and recreate the hosting/functions folders created during successful deploy and just manually deploy those instead

```
firebase deploy --debug
```

## Folder structures

Frontend deps appear both in root package.json and frontend package.json

This is because nx expects root versions, but firebase deploy populates to frontend during deploy build script

In future should resolve by manual firebase functions deployment template and own build processes

**TO SORT**

Currently the frontend package.json is incomplete but with duplicates also in the root package.json
