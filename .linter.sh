#!/bin/bash
cd /home/kavia/workspace/code-generation/kavyaresumeboost-24768-d3bc9489/kavya_resume_boost
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

