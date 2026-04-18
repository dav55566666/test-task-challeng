const FIGURE_CLASS =
    "relative m-0 overflow-hidden rounded-xl md:rounded-[1.25rem]";


export function ProjectGallery({
    images,
    primaryAlt,
    title,
}: {
    images: readonly string[];
    primaryAlt: string;
    title: string;
}) {
    return (
        <div className="flex min-w-0 flex-col gap-5 md:gap-5">
            {images.map((src, index) => (
                <figure key={`${src}-${index}`} className={FIGURE_CLASS}>
                    <img
                        src={src}
                        alt={
                            index === 0
                                ? primaryAlt
                                : `${title} — изображение ${index + 1}`
                        }
                        width={1200}
                        height={1200}
                        loading={index < 2 ? "eager" : "lazy"}
                        className="block h-auto w-full bg-[#f7f7f7] object-contain"
                    />
                </figure>
            ))}
        </div>
    );
}