#!/usr/bin/env python3
"""Convert JPEG images to WebP format for eco-design optimization."""

import os
from pathlib import Path
from PIL import Image

def convert_to_webp(input_path: str, output_path: str, quality: int = 80) -> dict:
    """Convert a JPEG image to WebP format."""
    with Image.open(input_path) as img:
        # Convert RGBA to RGB if necessary (WebP doesn't support RGBA in all cases)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        
        # Save as WebP
        img.save(output_path, 'WEBP', quality=quality, method=6)
        
        # Get file sizes
        original_size = os.path.getsize(input_path)
        webp_size = os.path.getsize(output_path)
        reduction = ((original_size - webp_size) / original_size) * 100
        
        return {
            'original': original_size,
            'webp': webp_size,
            'reduction': reduction
        }

def main():
    assets_dir = Path('src/assets')
    output_dir = Path('src/assets/webp')
    output_dir.mkdir(exist_ok=True)
    
    results = []
    
    for img_file in assets_dir.glob('*.jpg'):
        output_file = output_dir / f"{img_file.stem}.webp"
        
        try:
            result = convert_to_webp(str(img_file), str(output_file))
            results.append({
                'file': img_file.name,
                **result
            })
            print(f"✓ {img_file.name}: {result['original']//1024}KB → {result['webp']//1024}KB ({result['reduction']:.1f}% reduction)")
        except Exception as e:
            print(f"✗ {img_file.name}: {e}")
    
    # Summary
    total_original = sum(r['original'] for r in results)
    total_webp = sum(r['webp'] for r in results)
    total_reduction = ((total_original - total_webp) / total_original) * 100
    
    print(f"\n📊 Summary:")
    print(f"   Total original: {total_original//1024}KB")
    print(f"   Total WebP: {total_webp//1024}KB")
    print(f"   Total reduction: {total_reduction:.1f}%")

if __name__ == '__main__':
    main()
