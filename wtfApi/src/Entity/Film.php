<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Film
 *
 * @ORM\Table(name="film")
 * @ORM\Entity(repositoryClass="App\Repository\FilmRepository")
 */
class Film
{
    /**
     * @var int|null
     *
     * @ORM\Column(name="duree", type="integer", nullable=true)
     */
    private $duree;

    /**
     * @var \Video
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Video", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     * })
     */
    private $idVideo;

    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(?int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    public function getIdVideo(): ?Video
    {
        return $this->idVideo;
    }

    public function setIdVideo(?Video $idVideo): self
    {
        $this->idVideo = $idVideo;

        return $this;
    }

    public function serializeFilm() {
        return array_merge(
            array(
                'type' => 'film',
                'duree' => [
                    'total' => $this->getDuree(),
                    'heures' => substr(date('H\hi\m', mktime(0,$this->getDuree())),1),
                ]
            ),
            $this->getIdVideo()->serializeVideo()
        );
    }

    public static function serializeFilms($array) {
        dump($array);
        $result = array();
        foreach($array as $film) {
            $result[] = $film->serializeFilm();
        }
        return $result;
    }
}
